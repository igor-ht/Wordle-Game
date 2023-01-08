CREATE TABLE words (
	id SERIAL PRIMARY KEY,
	word VARCHAR(5),
	last_used TIMESTAMP
);

DO $$
DECLARE
array_words VARCHAR(5)[] :=
ARRAY['alone', 'atone', 'blast', 'blaze', 'blend', 'bless', 'bliss', 'blond', 'blush', 'board', 'boast', 'bound', 'braid', 'brand', 'brass', 'brave', 'bread', 'break', 'breed', 'bring', 'broad', 'brood', 'build', 'bully', 'bunch', 'burst', 'cable', 'cacao', 'caper', 'canal', 'candy', 'canoe', 'capit', 'carat', 'cargo', 'cater', 'cavil', 'cease', 'celer', 'cense', 'chain', 'chair', 'chalk', 'chaos', 'chart', 'chasm', 'cheat', 'check', 'cheek', 'cheer', 'chess', 'chest', 'chill', 'chime', 'chine', 'chive', 'chock', 'choir', 'chord', 'churn', 'civic', 'claim', 'clamp', 'clasp', 'clean', 'clear', 'climb', 'cloak', 'clock', 'close', 'clump', 'coach', 'coast', 'color', 'comic', 'conic', 'craze', 'crave', 'creak', 'crest', 'cribs', 'cried', 'crimp', 'crush', 'crypt', 'cubit', 'curbs', 'curls', 'curry', 'cutie', 'cycle', 'dance', 'death', 'decoy', 'deity', 'delay', 'depth', 'derby', 'deter', 'digby', 'diner', 'disco', 'ditch', 'dolor', 'domed', 'dozen', 'draft', 'drape', 'drift', 'drill', 'drink', 'drive', 'dwell', 'dying', 'eager', 'early', 'earth', 'eight', 'elite', 'empty', 'eying', 'faith', 'fancy', 'favor', 'feast', 'felon', 'ferry', 'field', 'fight', 'filth', 'flash', 'flora', 'floss', 'fluid', 'forge', 'forgo', 'frame', 'frost', 'fruit', 'funny', 'gauze', 'giant', 'gleam', 'globe', 'gloss', 'groan', 'groin', 'group', 'gulch', 'gusto', 'habit', 'hatch', 'haunt', 'heave', 'heron', 'hexed', 'hoard', 'hobby', 'homer', 'honor', 'human', 'humid', 'hurry', 'husky', 'icing', 'infix', 'inner', 'ivory', 'jaunt', 'juice', 'jumbo', 'kazoo', 'kneel', 'knurl', 'label', 'large', 'latch', 'leash', 'least', 'leave', 'lying', 'macho', 'magic', 'majik', 'mango', 'manor', 'marry', 'mauls', 'mauve', 'mayor', 'meant', 'melts', 'merry', 'mince', 'miser', 'mince', 'miser', 'moans', 'mocha', 'monks', 'month', 'moped', 'muggy', 'myths', 'naive', 'naval', 'nears', 'neigh', 'nerve', 'niche', 'niece', 'nihil', 'nines', 'noirs', 'north', 'nudge', 'occur', 'ocean', 'octal', 'odors', 'olive', 'onion', 'oozed', 'opsin', 'orbit', 'organ', 'osier', 'ought', 'ounce', 'outdo', 'owlet', 'pagan', 'paint', 'palms', 'parch', 'pasha', 'paste', 'pasty', 'patch', 'paths', 'peaks', 'pears', 'peeks', 'penal', 'petit', 'petry', 'petty', 'phage', 'phots', 'piano', 'picky', 'pivot', 'plans', 'plash', 'pleas', 'pluck', 'plumb', 'plump', 'plyer', 'pocks', 'poise', 'poker', 'poles', 'polyp', 'pomps', 'ponce', 'pouch', 'pours', 'pouts', 'preen', 'prima', 'prime', 'prims', 'prink', 'print', 'privy', 'prone', 'proud', 'prowl', 'pucks', 'pudgy', 'punch', 'purge', 'purrs', 'pushy', 'putts', 'putty', 'queen', 'queer', 'quick', 'quiet', 'quips', 'quits', 'quote', 'rains', 'raise', 'rally', 'rapid', 'ratio', 'reads', 'rebel', 'reels', 'renal', 'resin', 'revel', 'rheas', 'rhois', 'rhumb', 'rhyme', 'rills', 'roach', 'roast', 'robed', 'robes', 'rocks', 'roils', 'roles', 'rolls', 'roman', 'roofs', 'roomy', 'roots', 'ropes', 'rosin', 'rotis', 'round', 'rowdy', 'rugby', 'rules', 'rumen', 'rummy', 'runts', 'sable', 'saint', 'salon', 'salts', 'sands', 'sapid', 'sassy', 'satin', 'saucy', 'savor', 'sawed', 'scald', 'scaly', 'scamp', 'scans', 'scant', 'scare', 'scary', 'scoff', 'scold', 'scone', 'scour', 'scowl', 'scree', 'seamy', 'sears', 'seats', 'sebum', 'seced', 'seeds', 'seeks', 'seems', 'seine', 'seize', 'selfs', 'sells', 'septa', 'serfs', 'serum', 'seven', 'sewer', 'shack', 'shags', 'shalt', 'shams', 'shape', 'shard', 'shave', 'shawl', 'shaws', 'sheaf', 'shear', 'sheet', 'sheik', 'shift', 'shine', 'shins', 'shiny', 'shirk', 'shirt', 'shive', 'shoal', 'shock', 'shone', 'shook', 'shops', 'shore', 'shorn', 'short', 'shout', 'shove', 'shown', 'shrub', 'shuck', 'shunt', 'sifts', 'sighs', 'sight', 'singe', 'sinks', 'sired', 'sires', 'skein', 'skids', 'skies', 'skims', 'skink', 'skips', 'skirl', 'skulk', 'skull', 'slabs', 'slags', 'slant', 'slaps', 'slash', 'slats', 'slaws', 'slews', 'slick', 'slime', 'slimy', 'slips', 'slits', 'slobs', 'sloes', 'slope', 'slops', 'sloth', 'slums', 'slurs', 'smack', 'smelt', 'smile', 'smirk', 'smock', 'smoke', 'smoky', 'snack', 'snags', 'snail', 'snake', 'snaky', 'snaps', 'snare', 'sneak', 'sneer', 'snick', 'snipe', 'snips', 'snits', 'snobs', 'snood', 'snoop', 'snoot', 'snore', 'snoop', 'snort', 'snowy', 'snubs', 'snuff', 'solar', 'somas', 'sonar', 'sonic', 'sonny', 'soots', 'sorts', 'soupy', 'sours', 'south', 'sowed', 'sower', 'spacy', 'spank', 'spasm', 'spats', 'spays', 'speed', 'spelt', 'spend', 'spent', 'spews', 'spicy', 'spies', 'spiky', 'spine', 'spins', 'spiny', 'spire', 'spits', 'splat', 'splay', 'split', 'spoil', 'spoke', 'spoof', 'spook', 'spool', 'spoon', 'spoor', 'spore', 'spots', 'spout', 'spray', 'sprig', 'sprit', 'spurs', 'stack', 'staff', 'stage', 'stags', 'staid', 'stair', 'stand', 'stank', 'staph', 'stare', 'stark', 'stash', 'state', 'stats', 'stays', 'steak', 'steal', 'steam', 'steed', 'steep', 'steer', 'stein', 'stern', 'stick', 'stied', 'sties', 'stiff', 'stile', 'still', 'sting', 'stink', 'stoic', 'stoke', 'stole', 'stone', 'stony', 'stood', 'stool', 'stoop', 'stoss', 'stove', 'stows', 'straf', 'strap', 'straw', 'strew', 'stria', 'strip', 'strop', 'strum', 'stubs', 'stuck', 'studs', 'stuff', 'stump', 'stung', 'stunk', 'stuns', 'style', 'suave', 'sucks', 'sudsy', 'suede', 'suits', 'sulky', 'sully', 'sumer', 'sumos', 'super', 'surfs', 'surly', 'swags', 'swank', 'swans', 'swaps', 'swarm', 'sways', 'sweep', 'swell', 'swift', 'swims', 'swine', 'swing', 'swipe', 'swirl', 'swish', 'swoon', 'swoop', 'swops', 'swots', 'swung', 'sylph', 'synch', 'syncs', 'synod', 'table', 'tacet', 'tacks', 'tacky', 'taffy', 'taken', 'takes', 'talks', 'tally', 'tamed', 'tames', 'tamps', 'tangy', 'tanks', 'tansy', 'taped', 'taper', 'tapes', 'tapir', 'tardy', 'tasks', 'taste', 'tasty', 'taunt', 'teaks', 'teals', 'teams', 'tears', 'teats', 'teems', 'teens', 'telex', 'tells', 'tempt', 'tench', 'tends', 'tenet', 'tenon', 'tenor', 'tense', 'tenth', 'tents', 'testy', 'texas', 'thank', 'thaws', 'theft', 'their', 'theme', 'there', 'these', 'thigh', 'thing', 'think', 'thins', 'thole', 'thong', 'thorn', 'those', 'thous', 'three', 'threw', 'thrip', 'throb', 'throe', 'throw', 'thrum', 'thuds', 'thugs', 'thumb', 'thump', 'thyme', 'ticks', 'tidal', 'tides', 'tiers', 'tiffs', 'tiger', 'tiles', 'tills', 'tilts', 'timed', 'timer', 'times', 'timid', 'tinct', 'tines', 'tinge', 'tings', 'tints', 'tinyy', 'tipis', 'tipsr', 'tired', 'tires', 'titan', 'tithe', 'title', 'titus', 'toast', 'today', 'toddy', 'toffs', 'tofts', 'toils', 'tokay', 'token', 'tolls', 'tonal', 'tones', 'tonic', 'toons', 'tooth', 'topaz', 'topee', 'topes', 'topis', 'toque', 'torah', 'torch', 'torcs', 'torii', 'toros', 'torus', 'total', 'totes', 'touch', 'tough', 'tours', 'touse', 'towed', 'towel', 'tower', 'toxic', 'tract', 'trade', 'trail', 'train', 'trait', 'traps', 'trash', 'tread', 'treat', 'treed', 'trees', 'treks', 'trend', 'tress', 'triad', 'trial', 'tribe', 'trice', 'trick', 'tried', 'tries', 'trigo', 'trims', 'trios', 'trips', 'trite', 'trode', 'trois', 'troop', 'trots', 'trout', 'truer', 'truly', 'trump', 'trunk', 'trust', 'truth', 'tubes', 'tucks', 'tulip', 'tummy', 'tumor', 'tunas', 'tuned', 'tuner', 'tunes', 'tunic', 'turbo', 'turfs', 'turns', 'twain', 'twang', 'tweak', 'tween', 'twerp', 'twice', 'twine', 'twins', 'twirl', 'twist', 'twits', 'tying', 'tykes', 'udder', 'ulcer', 'unapt', 'unbid', 'uncap', 'uncut', 'under', 'undid', 'undue', 'unfed', 'unfit', 'unfix', 'ungod', 'unhat', 'unlit', 'unman', 'unmet', 'unpay', 'unrig', 'unrip', 'unset', 'untie', 'until', 'unwed', 'upend', 'upped', 'upper', 'upset', 'uring', 'usurp', 'utter', 'vacua', 'vague', 'valet', 'valid', 'valor', 'value', 'valve', 'vamps', 'vanes', 'vapid', 'vapor', 'vents', 'verge', 'verse', 'verve', 'vexed', 'vials', 'vibes', 'vicar', 'viced', 'vices', 'video', 'views', 'vigor', 'viler', 'vines', 'vinyl', 'viols', 'viper', 'viral', 'virts', 'virus', 'visor', 'vista', 'vitae', 'vital', 'vivid', 'vixen', 'vogue', 'voice', 'voids', 'volit', 'volts', 'vomit', 'voted', 'voter', 'votes', 'vouch', 'vowed', 'vowel', 'wacks', 'wacky', 'waded', 'wader', 'wades', 'wafer', 'wafts', 'waged', 'wager', 'wages', 'wagon', 'waifs', 'wails', 'waist', 'waits', 'waked', 'waken', 'wales', 'walks', 'walla', 'walls', 'waltz', 'wands', 'wanes', 'wanly', 'wants', 'wards', 'wares', 'warms', 'warns', 'warts', 'waste', 'wasts', 'watch', 'water', 'watts', 'waved', 'waver', 'waves', 'waxed', 'waxen', 'waxer', 'waxes', 'wears', 'weave', 'weds', 'weedy', 'weeks', 'weens', 'weeny', 'weeps', 'weepy', 'weest', 'weigh', 'weird', 'welch', 'welts', 'wends', 'wetly', 'whack', 'whale', 'whams', 'wharf', 'wheat', 'wheel', 'whets', 'whiff', 'while', 'whims', 'whine', 'whiny', 'whips', 'whirl', 'whirr', 'whisk', 'whist', 'white', 'whole', 'whomp', 'whoop', 'whops', 'whorl', 'whose', 'wicks', 'widen', 'wider', 'widow', 'width', 'wield', 'wifed', 'wifes', 'wince', 'winch', 'winds', 'windy', 'wined', 'wines', 'wings', 'winks', 'winos', 'wiped', 'wiper', 'wipes', 'wired', 'wirer', 'wires', 'wiser', 'wisps', 'wispy', 'wists', 'witch', 'withs', 'witty', 'wived', 'wiver', 'wives', 'wizen', 'woads', 'woful', 'woken', 'wolds', 'woman', 'wombs', 'women', 'wonks', 'wonts', 'woods', 'woody', 'wools', 'woozy', 'words', 'wordy', 'works', 'world', 'worms', 'wormy', 'worry', 'worse', 'worst', 'worth', 'worts', 'would', 'wound', 'woven', 'wrack', 'wrath', 'wreak', 'wreck', 'wrens', 'wrest', 'wried', 'wrier', 'wries', 'wrink', 'write', 'writs', 'wrong', 'wrote', 'wroth', 'wryer', 'wryly', 'yacks', 'yarns', 'yawed', 'yawls', 'yawns', 'ycles', 'yeans', 'years', 'yearn', 'yeast', 'yells', 'yelps', 'yenta', 'yerba', 'yield', 'yodel', 'yokes', 'yolks', 'young', 'yours', 'youse', 'yowed', 'yowie', 'yowls', 'zacks', 'zaire', 'zakat', 'zamia', 'zayin', 'zeals', 'zeals', 'zebra', 'zeins', 'zerks', 'zests', 'zesty', 'zetas', 'zibet', 'zilch', 'zills', 'zincs', 'zines', 'zings', 'zingy', 'zinky', 'zippy', 'zitis', 'zloty', 'zoeal', 'zonal', 'zoned', 'zoner', 'zones', 'zooid', 'zooks', 'zooms'];
var VARCHAR(5);
BEGIN
FOREACH var IN ARRAY array_words
	LOOP
	INSERT INTO words(word) VALUES (var);
	END LOOP;
END$$;

SELECT * FROM words;

TRUNCATE TABLE words RESTART IDENTITY;

---------------------------------------------------------

CREATE TABLE users (
	uid SERIAL PRIMARY KEY,
	uname VARCHAR(255) NOT NULL,
	uemail VARCHAR(200) NOT NULL,
	upassword VARCHAR(255) NOT NULL,
	Uregistration TIMESTAMP NOT NULL
);

SELECT * FROM users;

TRUNCATE TABLE users RESTART IDENTITY;

















