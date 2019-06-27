const levelup = require('level');
const db = levelup('./data', { valueEncoding: 'json' });

const marked = require('marked');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const crypto = require('crypto');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(morgan(':method :url :status - :response-time ms'));
app.use(bodyParser.urlencoded({ extended: true }));
const data = [];

app.get('/', (req, res, next) => {
	db.createReadStream()
		.on('data', post => {
			data.push({
				url: '/' + post.key,
				title: post.value.title || post.key,
				content: marked(post.value.short),
			});
		})
		.on('end', () => {
			const posts = data.map(e => e['url'])
				.map((e, i, final) => final.indexOf(e) === i && i)
				.filter(e => data[e]).map(e => data[e]);
			res.render('index', { posts } );
		});
});

app.get('/create-post', (req, res) => {
	res.render('create-post');
});

app.post('/create-post', (req, res) => {
	function getUniqueId(prime){
		var diffHell = crypto.createDiffieHellman(prime);
		diffHell.generateKeys('hex');
		return diffHell.getPrivateKey('hex');
	};

	const id = getUniqueId(1024);
	//console.log(id);
	db.put(id, {
		title: req.body.title,
		short: req.body.short,
		long: req.body.long,
	}, (err) => {
		if (err) {
			console.log(err);
			res.redirect(`/`);
		}
		console.log(`Created Post ${id}`);
		res.redirect(`/${id}`);
	});
});

app.get('/:post', (req, res, next) => {
	db.get(req.params.post, (err, post) => {
		if (err) {
			if (err.name === 'NotFoundError') {
				return next();
			} else {
				return next(err);
			}
		}
		res.render('post', {
			post: {
				title: post.title,
				content: marked(post.long || post.short),
			},
		});
	});
});

app.use((req, res, next) => {
	res.status(404).render('not-found');
});

app.use((err, req, res, next) => {
	console.log('---------');
	console.error(err);
	res.status(err.status || 500).render('error', { err });
});

app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});

if (process.argv[2] === '--reset') {
	db.createKeyStream().on('data', key => db.del(key));
	console.log('Reset the content database');
}
