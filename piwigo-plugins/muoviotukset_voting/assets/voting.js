(function () {
	var apiPath = '/gallery/plugins/muoviotukset_voting/api.php';
	var tokenKey = 'muoviotukset.galleryVotingToken.v1';
	var pollInterval = 5000;

	var copy = {
		en: {
			abilityLabel: 'Ability',
			creatureAbilityLabel: 'Special ability',
			collectedPartsLabel: 'Unlocked parts',
			factionLabel: 'Faction',
			finalScoreLabel: 'Final score',
			materialsLabel: 'Materials used',
			partsOnCreatureLabel: 'Parts on creature',
			playerAgeLabel: 'Player age',
			rubberBandsLabel: 'Rubber bands',
			survivalLabel: 'Survival style',
			tapeLabel: 'Tape',
			teamNameLabel: 'Team name',
			cableTiesLabel: 'Cable ties',
			vote: 'Vote',
			voted: 'Voted',
			noVotes: 'All 3 votes used',
			status: function (remaining) {
				return remaining === 1 ? 'You have 1 vote left.' : 'You have ' + remaining + ' votes left.';
			},
			already: 'You have already voted for this creature.',
			count: function (count) {
				return count === 1 ? '1 vote' : count + ' votes';
			}
		},
		fi: {
			abilityLabel: 'Erikoiskyky',
			creatureAbilityLabel: 'Erikoiskyky',
			collectedPartsLabel: 'Kerätyt osat',
			factionLabel: 'Heimo',
			finalScoreLabel: 'Pisteet',
			materialsLabel: 'Käytetyt materiaalit',
			partsOnCreatureLabel: 'Osia otuksessa',
			playerAgeLabel: 'Pelaajan ikä',
			rubberBandsLabel: 'Kuminauhat',
			survivalLabel: 'Selviytymistapa',
			tapeLabel: 'Teippi',
			teamNameLabel: 'Ryhmän nimi',
			cableTiesLabel: 'Nippusiteet',
			vote: 'Anna ääni',
			voted: 'Äänestetty',
			noVotes: 'Kaikki 3 ääntä käytetty',
			status: function (remaining) {
				return remaining === 1 ? 'Sinulla on 1 ääni jäljellä.' : 'Sinulla on ' + remaining + ' ääntä jäljellä.';
			},
			already: 'Olet jo äänestänyt tätä otusta.',
			count: function (count) {
				return count === 1 ? '1 ääni' : count + ' ääntä';
			}
		}
	};

	function language() {
		var htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
		var stored = '';
		try {
			stored = localStorage.getItem('muoviotukset.language') || '';
		} catch (error) {}

		return htmlLang.indexOf('fi') === 0 || stored === 'fi' ? 'fi' : 'en';
	}

	function t() {
		return copy[language()] || copy.en;
	}

	function applyLanguageLabels() {
		var lang = language();
		document.querySelectorAll('[data-lang-' + lang + ']').forEach(function (node) {
			node.textContent = node.getAttribute('data-lang-' + lang);
		});
	}

	function getToken() {
		try {
			var existing = localStorage.getItem(tokenKey);
			if (existing) {
				return existing;
			}

			var bytes = new Uint8Array(24);
			window.crypto.getRandomValues(bytes);
			var token = Array.prototype.map.call(bytes, function (byte) {
				return ('0' + byte.toString(16)).slice(-2);
			}).join('');
			localStorage.setItem(tokenKey, token);
			return token;
		} catch (error) {
			var fallback = String(Date.now()) + String(Math.random()).replace(/\D/g, '') + String(Math.random()).replace(/\D/g, '');
			return fallback.slice(0, 64);
		}
	}

	function imageIdFromHref(href) {
		var match = href.match(/picture\.php\?\/(\d+)/);
		return match ? match[1] : null;
	}

	function requestCounts(ids, includeToken) {
		if (!ids.length) {
			return Promise.resolve({ ok: true, counts: {} });
		}

		var url = apiPath + '?ids=' + encodeURIComponent(ids.join(','));
		if (includeToken) {
			url += '&token=' + encodeURIComponent(getToken());
		}

		return fetch(url, { credentials: 'same-origin' }).then(function (response) {
			return response.json();
		});
	}

	function updateThumbnailBadges() {
		var links = Array.prototype.slice.call(document.querySelectorAll('#thumbnails a[href*="picture.php?/"]'));
		var ids = [];
		var byId = {};

		links.forEach(function (link) {
			var id = imageIdFromHref(link.getAttribute('href') || '');
			if (!id) {
				return;
			}
			ids.push(id);
			byId[id] = byId[id] || [];
			byId[id].push(link);
		});

		requestCounts(ids, false).then(function (data) {
			if (!data.ok) {
				return;
			}

			Object.keys(byId).forEach(function (id) {
				var count = Number(data.counts[id] || 0);
				byId[id].forEach(function (link) {
					var item = link.closest('li') || link.parentNode;
					var legend = findOrCreateCaption(item);
					var detail = data.details && data.details[id] ? data.details[id] : {};
					if (!detail.name && data.names && data.names[id]) {
						detail.name = data.names[id];
					}
					var badge = rebuildCreatureCaption(legend, item, detail);
					badge.textContent = t().count(count);
				});
			});
		}).catch(function () {});
	}

	function findOrCreateCaption(item) {
		var legend = item.querySelector('.overDesc') || item.querySelector('.thumbLegend');
		if (legend) {
			return legend;
		}

		legend = document.createElement('div');
		legend.className = 'overDesc';
		item.appendChild(legend);
		return legend;
	}

	function localizedValue(value) {
		if (!value) {
			return '';
		}
		if (typeof value === 'string') {
			return value;
		}
		var lang = language();
		return value[lang] || value.en || value.fi || '';
	}

	function setLocalizedField(fields, key, lang, value) {
		value = (value || '').trim();
		if (!value) {
			return;
		}

		fields[key] = fields[key] || { en: '', fi: '' };
		fields[key][lang] = value;
	}

	function cleanCommentLine(text) {
		return (text || '').replace(/\s+/g, ' ').trim();
	}

	function valueAfterPrefix(line, prefix) {
		return line.slice(prefix.length).trim();
	}

	function parseContextValue(value, lang) {
		var marker = lang === 'fi' ? /\s+Laatikko:.*$/i : /\s+Box:.*$/i;
		return value.replace(marker, '').trim();
	}

	function parseMaterialsLine(fields, lang, line, cablePrefix, tapePrefix) {
		var value = valueAfterPrefix(line, cablePrefix);
		var tapeIndex = value.toLowerCase().indexOf(tapePrefix.toLowerCase());
		if (tapeIndex === -1) {
			setLocalizedField(fields, 'cableTies', lang, value);
			return;
		}

		setLocalizedField(fields, 'cableTies', lang, value.slice(0, tapeIndex).trim());
		setLocalizedField(fields, 'tapeCm', lang, value.slice(tapeIndex + tapePrefix.length).trim());
	}

	function parseCommentLine(fields, lang, line) {
		var rules = [
			{ prefix: 'Creature name:', key: 'name' },
			{ prefix: 'Otuksen nimi:', key: 'name' },
			{ prefix: 'Special ability:', key: 'ability' },
			{ prefix: 'Erikoiskyky:', key: 'ability' },
			{ prefix: 'Faction:', key: 'faction', context: true },
			{ prefix: 'Heimo:', key: 'faction', context: true },
			{ prefix: 'Survival style:', key: 'survival' },
			{ prefix: 'Selviytymistapa:', key: 'survival' },
			{ prefix: 'Efficiency judgement:', key: 'survival' },
			{ prefix: 'Tehokkuusarvio:', key: 'survival' },
			{ prefix: 'Unlocked parts:', key: 'collectedParts' },
			{ prefix: 'Collected parts:', key: 'collectedParts' },
			{ prefix: 'Avatut osat:', key: 'collectedParts' },
			{ prefix: 'Kerätyt osat:', key: 'collectedParts' },
			{ prefix: 'Parts on creature:', key: 'partsOnCreature' },
			{ prefix: 'Osia otuksessa:', key: 'partsOnCreature' },
			{ prefix: 'Rubber bands:', key: 'rubberBands' },
			{ prefix: 'Kuminauhat:', key: 'rubberBands' },
			{ prefix: 'Final score:', key: 'finalScore' },
			{ prefix: 'Loppupisteet:', key: 'finalScore' },
			{ prefix: 'Team name / class:', key: 'teamName' },
			{ prefix: 'Ryhmän nimi / luokka:', key: 'teamName' },
			{ prefix: 'Team name:', key: 'teamName' },
			{ prefix: 'Ryhmän nimi:', key: 'teamName' },
			{ prefix: 'Player age:', key: 'playerAge' },
			{ prefix: 'Pelaajan ikä:', key: 'playerAge' },
			{ prefix: 'Difficulty:', key: 'difficulty' },
			{ prefix: 'Vaikeustaso:', key: 'difficulty' }
		];

		if (line.indexOf('Cable ties:') === 0) {
			parseMaterialsLine(fields, lang, line, 'Cable ties:', 'Tape (cm):');
			return;
		}

		if (line.indexOf('Nippusiteet:') === 0) {
			parseMaterialsLine(fields, lang, line, 'Nippusiteet:', 'Teippi (cm):');
			return;
		}

		rules.some(function (rule) {
			if (line.indexOf(rule.prefix) !== 0) {
				return false;
			}

			var value = valueAfterPrefix(line, rule.prefix);
			setLocalizedField(fields, rule.key, lang, rule.context ? parseContextValue(value, lang) : value);
			return true;
		});
	}

	function parseCreatureComment() {
		var comment = document.querySelector('.imageComment');
		var fields = {};
		if (!comment) {
			return fields;
		}

		var spans = Array.prototype.slice.call(comment.querySelectorAll('span[lang]'));
		if (spans.length) {
			spans.forEach(function (span) {
				var lang = (span.getAttribute('lang') || 'en').toLowerCase().indexOf('fi') === 0 ? 'fi' : 'en';
				parseCommentLine(fields, lang, cleanCommentLine(span.textContent));
			});
			return fields;
		}

		(comment.textContent || '').split(/\n+/).forEach(function (line) {
			parseCommentLine(fields, 'en', cleanCommentLine(line));
		});
		return fields;
	}

	function displayValue(fields, key) {
		return localizedValue(fields[key]) || '-';
	}

	function titleCaseFaction(value) {
		if (!value || value === '-') {
			return value;
		}

		return value.charAt(0).toUpperCase() + value.slice(1);
	}

	function ageFromDifficulty(fields) {
		var age = localizedValue(fields.playerAge);
		if (age) {
			return age;
		}

		var difficulty = localizedValue(fields.difficulty).toLowerCase();
		if (difficulty === 'easy' || difficulty === 'helppo') {
			return language() === 'fi' ? 'Alle 9 vuotta' : 'Under 9 years';
		}
		if (difficulty === 'hard' || difficulty === 'vaikea') {
			return language() === 'fi' ? 'Yli 9 vuotta' : 'Over 9 years';
		}

		return '-';
	}

	function materialsValue(fields) {
		var parts = [];
		var rubberBands = localizedValue(fields.rubberBands);
		var cableTies = localizedValue(fields.cableTies);
		var tape = localizedValue(fields.tapeCm);

		if (rubberBands) {
			parts.push(t().rubberBandsLabel + ': ' + rubberBands);
		}
		if (cableTies) {
			parts.push(t().cableTiesLabel + ': ' + cableTies);
		}
		if (tape) {
			parts.push(t().tapeLabel + ': ' + tape + (/\d$/.test(tape) ? ' cm' : ''));
		}

		return parts.join(', ') || '-';
	}

	function detailRow(label, value, className) {
		var row = document.createElement('div');
		row.className = 'muov-creature-row' + (className ? ' ' + className : '');

		var labelNode = document.createElement('dt');
		labelNode.className = 'muov-creature-row__label';
		labelNode.textContent = label;

		var valueNode = document.createElement('dd');
		valueNode.className = 'muov-creature-row__value';
		valueNode.textContent = value;

		row.append(labelNode, valueNode);
		return row;
	}

	function cloneCreatureImage() {
		var image = document.getElementById('theMainImage');
		if (!image) {
			return null;
		}

		var clone = image.cloneNode(false);
		clone.id = 'muovCreatureImage';
		clone.removeAttribute('usemap');
		clone.removeAttribute('title');

		var nextArea = document.querySelector('map[name="mapmedium"] area[href*="picture.php?/"]');
		if (nextArea) {
			clone.addEventListener('click', function () {
				window.location.href = nextArea.getAttribute('href').replace('&amp;', '&');
			});
		}

		return clone;
	}

	function buildCreatureDetailPage() {
		if (document.body.id !== 'thePicturePage' || document.querySelector('.muov-creature-detail')) {
			return;
		}

		var fields = parseCreatureComment();
		var image = cloneCreatureImage();
		var topBack = document.querySelector('.mm-back-to-gallery:not(.mm-back-to-gallery--bottom)');
		var content = document.getElementById('content');
		if (!image || !content) {
			return;
		}

		var name = displayValue(fields, 'name');
		if (name === '-') {
			var title = document.querySelector('#imageHeaderBar h2') || document.querySelector('title');
			name = title ? cleanCommentLine(title.textContent) : '';
		}

		var section = document.createElement('section');
		section.className = 'muov-creature-detail';

		var logo = document.createElement('img');
		logo.className = 'muov-creature-detail__logo';
		logo.src = '/public/assets/textlogo_500x97.png';
		logo.alt = 'Muoviotuspeli';

		var titleNode = document.createElement('h1');
		titleNode.className = 'muov-creature-detail__name';
		titleNode.textContent = name;

		var photo = document.createElement('div');
		photo.className = 'muov-creature-detail__photo';
		photo.appendChild(image);

		var facts = document.createElement('dl');
		facts.className = 'muov-creature-facts';
		facts.append(
			detailRow(t().factionLabel, titleCaseFaction(displayValue(fields, 'faction'))),
			detailRow(t().creatureAbilityLabel, displayValue(fields, 'ability')),
			detailRow(t().survivalLabel, displayValue(fields, 'survival')),
			detailRow(t().collectedPartsLabel, displayValue(fields, 'collectedParts'), 'muov-creature-row--group-start'),
			detailRow(t().partsOnCreatureLabel, displayValue(fields, 'partsOnCreature')),
			detailRow(t().materialsLabel, materialsValue(fields)),
			detailRow(t().finalScoreLabel, displayValue(fields, 'finalScore'), 'muov-creature-row--score'),
			detailRow(t().teamNameLabel, displayValue(fields, 'teamName')),
			detailRow(t().playerAgeLabel, ageFromDifficulty(fields))
		);

		if (topBack) {
			section.append(logo, topBack, titleNode, photo, facts);
			content.prepend(section);
		} else {
			section.append(logo, titleNode, photo, facts);
			content.prepend(section);
		}

		document.body.classList.add('muov-creature-enhanced');
	}

	function metaRow(label, value, className) {
		var text = localizedValue(value);
		if (!text) {
			return null;
		}

		var row = document.createElement('span');
		row.className = 'muov-vote-stat ' + className;

		var labelNode = document.createElement('span');
		labelNode.className = 'muov-vote-stat__label';
		labelNode.textContent = label;

		var valueNode = document.createElement('span');
		valueNode.className = 'muov-vote-stat__value';
		valueNode.textContent = text;

		row.append(labelNode, valueNode);
		return row;
	}

	function rebuildCreatureCaption(legend, item, detail) {
		var badge = legend.querySelector('.muov-vote-badge') || document.createElement('span');
		var originalName = Array.prototype.slice.call(legend.childNodes).filter(function (node) {
			return node.nodeType === 3;
		}).map(function (node) {
			return node.textContent.trim();
		}).filter(Boolean).join(' ');
		var image = item.querySelector('img');
		var name = detail.name || originalName || (image ? image.getAttribute('alt') || '' : '');
		var star = legend.querySelector('.albSymbol') || item.querySelector('.albSymbol');
		var starClone = star ? star.cloneNode(true) : null;

		var row = document.createElement('span');
		row.className = 'muov-vote-name-row';
		row.setAttribute('data-creature-name', name);
		row.appendChild(document.createTextNode(name));
		if (starClone) {
			row.appendChild(starClone);
		}

		var stats = document.createElement('span');
		stats.className = 'muov-vote-stats';
		[
			metaRow(t().abilityLabel, detail.ability, 'muov-vote-stat--ability'),
			metaRow(t().survivalLabel, detail.survival, 'muov-vote-stat--survival')
		].forEach(function (row) {
			if (row) {
				stats.appendChild(row);
			}
		});

		badge.className = 'muov-vote-badge';
		legend.classList.add('muov-vote-caption');
		if (stats.children.length > 0) {
			legend.replaceChildren(row, stats, badge);
		} else {
			legend.replaceChildren(row, badge);
		}

		return badge;
	}

	function updateVoteCard(card) {
		var imageId = card.getAttribute('data-image-id');
		var countNode = card.querySelector('[data-muov-vote-count]');
		var statusNode = card.querySelector('[data-muov-vote-status]');
		var button = card.querySelector('[data-muov-vote-button]');

		requestCounts([imageId], true).then(function (data) {
			if (!data.ok) {
				return;
			}

			var count = Number(data.counts[imageId] || 0);
			var remaining = Number(data.remaining || 0);
			var voted = Boolean(data.voted && data.voted[imageId]);

			countNode.textContent = count;
			statusNode.textContent = voted ? t().already : t().status(remaining);
			button.textContent = voted ? t().voted : remaining > 0 ? t().vote : t().noVotes;
			button.disabled = voted || remaining <= 0;
		}).catch(function () {});
	}

	function bindVoteCard(card) {
		var button = card.querySelector('[data-muov-vote-button]');
		var imageId = card.getAttribute('data-image-id');

		button.addEventListener('click', function () {
			button.disabled = true;
			fetch(apiPath, {
				method: 'POST',
				credentials: 'same-origin',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ image_id: imageId, token: getToken() })
			}).then(function (response) {
				return response.json();
			}).then(function () {
				updateVoteCard(card);
				updateThumbnailBadges();
			}).catch(function () {
				updateVoteCard(card);
			});
		});

		updateVoteCard(card);
		window.setInterval(function () {
			updateVoteCard(card);
		}, pollInterval);
	}

	function init() {
		applyLanguageLabels();
		buildCreatureDetailPage();
		updateThumbnailBadges();
		document.querySelectorAll('[data-muoviotukset-voting]').forEach(bindVoteCard);
		if (document.getElementById('thumbnails')) {
			window.setInterval(updateThumbnailBadges, pollInterval);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
