/**
 * SCDV
 * @param {string} identifier
 * @param {string} host
 * @param {string} protocol
 * @param {boolean} cors
 */
function SCDV(identifier, host, protocol, cors) {
	const date  = new Date;
	const stamp = '' + date.getDate() + date.getMonth() + date.getFullYear() + date.getHours() + date.getMinutes() + date.getSeconds();

	const element = document.createElement('a');
	element.setAttribute('download', 'video_' + stamp + '.mp4');
	element.style.display = 'none';

	document.body.appendChild(element);

	identifier = identifier ? identifier : '5suhqzmjuim1';
	protocol   = protocol ? protocol : 'http://';
	host       = host ? host : 'streamcloud.eu';
	cors       = cors ? cors : false;

	if(location.hostname !== host) {
		return new Error('This script can only be executed on this page: "' + protocol + host + '".');
	}

	fetch(protocol + host + '/' + identifier,
		{
			'headers': {
				'content-type': 'application/x-www-form-urlencoded'
			},
			'body'   : 'op=download1&id=' + identifier + '&imhuman=extraterrestrial',
			'method' : 'POST'
		}
	).then(
		function(response) {
			return response.text()
		}
	).then(
		function(text) {
			const matches = text.match(/file:\s"(.*)"/gi);
			const video   = matches[0].substring(matches[0].indexOf('"') + 1, matches[0].lastIndexOf('"'));

			if(true === cors) {
				return fetch(video, {
					'method': 'GET'
				});
			}
			else {
				element.setAttribute('href', video);

				return cors;
			}
		}
	).then(
		function(response) {
			if(true === cors) {
				return response.text();
			}
			else {
				return cors;
			}
		}
	).then(
		function(text) {
			if(true === cors) {
				element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
			}

			element.click();

			document.body.removeChild(element);
		}
	).catch(function(error) {
		console.log(error);
		console.log('Hint: A possible cross origin read blocking (CORB) error occurred.');
		console.log('Try setting CORS to false instead. [default]');
	});
}

// Example usage
// SCDV('5suhqzmjuim1');
