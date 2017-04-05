const args = require('yargs')
    .argv
const map = {
  'a': '(false+[])[1]',
  'b': '((![]).constructor+[])[9].toLowerCase()',
  'c': '(constructor.constructor+[])[3]',
  'd': '(((![]).constructor+[])[21]===((![]).constructor+[])[8]?((![]).constructor+[])[35]:((![]).constructor+[])[31])',
  'e': '(false+[])[4]',
  'f': '(false+[])[0]',
  'g': '((false+[]).constructor+[])[14]',
  'h': '(+(101)).toString(21)[1]',
  'i': '((![]).constructor+[])[5]',
  'j': '([].entries()+[])[3]',
  'k': '(+(20)).toString(21)',
  'l': '(false+[])[2]',
  'm': '((1).constructor+[])[11]',
  'n': '((![]).constructor+[])[2]',
  'o': '((![]).constructor+[])[6]',
  'p': '(+(211)).toString(31)[1]',
  'q': '(+(212)).toString(31)[1]',
  'r': '(true+[])[1]',
  's': '(false+[])[3]',
  't': '(true+[])[0]',
  'u': '(true+[])[2]',
  'v': '(+(31)).toString(32)',
  'w': '(+(32)).toString(33)',
  'x': '(+(101)).toString(34)[1]',
  'y': '([].keys+[])[11]',
  'z': '(+(35)).toString(36)',
  '.': '(+(+!+[]+[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+[!+[]+!+[]]+[+[]])+[])[+!+[]]',
  '=': '(false+[]).fontcolor()[11]',
  '"': '(false+[]).fontcolor()[12]',
  "'": '(false+[]).constructor.fromCharCode(39)',
  ' ': '([].fill+[])[8]',
  '/': '(false+[]).italics()[9]',
  '\\': '(false+[]).constructor.fromCharCode(92)',
  '(': '([].keys+[])[13]',
  ')': '([].keys+[])[14]',
  '<': '(false+[]).fontcolor()[0]',
  '>': '(false+[]).italics()[2]',
  '+': '(+(+!+[]+(!+[]+[])[!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]])+[])[2]',
  'H': '(false+[]).constructor.fromCharCode(72)',
  'T': '(false+[]).constructor.fromCharCode(84)',
  'M': '(false+[]).constructor.fromCharCode(77)',
  'L': '(false+[]).constructor.fromCharCode(76)',
  ',': '(false+[]).constructor.fromCharCode(44)',
  '?': '(false+[]).constructor.fromCharCode(63)'
}

function mappingReduced (str, indexes) {
  var ret = ''
  for (let i = 0; i < str.length; i++) {
    ret += (ret === '' ? '' : '+') + indexes[str[i]]
  }
  return ret
}

function hard (str) {
  let ret = ''
  let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai', 'aj', 'ak', 'al', 'am', 'an', 'ao']
  let indexes = {}
  for (let i = 0; i < str.length; i++) {
    if (Object.keys(indexes).indexOf(str[i]) === -1) {
      indexes[str[i]] = letters[Object.keys(indexes).length]
      if (isNaN(parseInt(str[i]))) {
        ret += indexes[str[i]] + '=' + map[str[i]] + ';' + (args.clean ? '\n' : '')
      } else {
        ret += indexes[str[i]] + '=(' + str[i] + '+[]);' + (args.clean ? '\n' : '')
      }
    }
  }
  let code = mappingReduced(str, indexes)
  return '{{' + (args.clean ? '\n' : '') +
    ret +
    'str=' + code + ';' + (args.clean ? '\n' : '') +
    'constructor.constructor(str)()' + (args.clean ? '\n' : '') +
  '}}'
}

function soft (str) {
  return '{{constructor.constructor((false+[]).constructor.fromCharCode(' + (str.split('').map((o) => o.charCodeAt(0))) + '))()}}'
}

if (args._[0]) {
  console.log(args._[0], ':')
  if (args.hard) {
    console.log(hard(args._[0]))
  } else {
    console.log(soft(args._[0]))
  }
}



module.exports = {hard, soft}
