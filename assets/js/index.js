
const Chords = 36
const Factor = 2
const Rounds = 1
const StartAngle = 0
const PI = Math.PI    // 3.1415

const Colors = [
  'red'
  , 'orange'
  , 'yellow'
  , 'green'
  , 'cyan'
  , 'blue'
  , 'purple'
]

let title = 'Elegant Curve'.toUpperCase()
console.group(title);

const b = document.body
const canvas = document.querySelector('#cvs-1')
const ctx = canvas.getContext('2d')

let cw = canvas.width = b.clientWidth * 0.95
let ch = canvas.height = b.clientHeight * 0.95

const XC = cw / 2
const YC = ch / 2

let Radius    = Math.round(Math.min(cw, ch) * 0.90 / 2)
let AngleSkip = StartAngle * PI / 180
let AngleStep = 2 * PI / Chords

let arrPoints = [];

// -------------------------------------------------------------------------  ##

function init () {

  console.info(`Chords = [${Chords}]`)
  console.info(`Radius = [${Radius}]`)
  console.info(`AngleSkip = [${AngleSkip}]`)
  console.info(`AngleStep = [${AngleStep}]`)

  genPoints()
  drawBase()
}

function start () {
  drawSectors()
  drawChords()
}

let DataUrl = canvas.toDataURL()
// console.log(`DataUrl = [${DataUrl}]`);

// -------------------------------------------------------------------------  ##

function pset (ang, r) {
  let x = r * Math.cos(ang)
  let y = r * Math.sin(ang)
  return [Math.round(x), Math.round(y)]
}

// -------------------------------------------------------------------------  ##

function genPoints () {
  for (let ic = 1; ic <= Chords; ic++) {
    let curAngle = AngleSkip + ic * AngleStep
    arrPoints.push( pset(curAngle, Radius) )
  }
  console.log('POINTS LIST:');
  console.dir(arrPoints);
}

// -------------------------------------------------------------------------  ##
//  BASE lines
// -------------------------------------------------------------------------  ##
function drawBase () {

  //  Draw a full BIG circle
  ctx.beginPath()
  ctx.arc(XC, YC, Radius, 0, 2 * PI)
  ctx.lineWidth = 10
  ctx.strokeStyle = 'lightgray'
  ctx.stroke()
  ctx.closePath()

  //  Draw SMALL circle at the CENTER
  ctx.beginPath()
  ctx.arc(XC, YC, 5, 0, 2 * PI)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
  ctx.fill()
  ctx.closePath()

}

// -------------------------------------------------------------------------  ##
//  POINTS
// -------------------------------------------------------------------------  ##
function drawSectors () {
  ctx.beginPath()
  let [xs, ys] = pset(AngleSkip, Radius)
  ctx.moveTo(XC + xs, YC + ys)

  for (let ic = 0; ic < arrPoints.length; ic++) {
    let [xi, yi] = arrPoints[ic]
    ctx.lineTo(XC + xi, YC + yi)
    ctx.lineWidth = 3
    ctx.strokeStyle = 'blue'
    ctx.stroke()

    ctx.lineWidth = 1
    ctx.font = 'bold 20px Calibri'
    ctx.lineCap = 'round';
    ctx.fillStyle = Colors[ ic % Colors.length ]
    // ctx.textAlign = 'left'
    ctx.fillText(1 + ic, XC + xi + 0.5 * (Chords - ic), YC + yi + 0.2 * (ic - Chords))
  }

  ctx.closePath()
}

// -------------------------------------------------------------------------  ##
//  CHORDS
// -------------------------------------------------------------------------  ##
function drawChords () {
  let title = `Chords List (${Chords}):`
  console.groupCollapsed(title);

  ctx.lineWidth = 3
  ctx.strokeStyle = 'white'
  // ctx.strokeStyle = Colors[ ik % Colors.length ]

  for (let ic = 1; ic <= arrPoints.length * Rounds; ic++) {
    let ik1 = (ic - 1) % Chords
    let ik2 = (ic * Factor - 1) % Chords
    let [x1, y1] = arrPoints[ik1]
    let [x2, y2] = arrPoints[ik2]

    ctx.beginPath()
    ctx.moveTo(XC + x1, YC + y1)
    ctx.lineTo(XC + x2, YC + y2)
    ctx.stroke()
    ctx.closePath()

    console.log(`[${ic}]: [${ic} to ${ic * Factor}] === LINE (${x1}, ${y1}) - (${x2}, ${y2})`)
  }

  console.groupEnd(title);
}

// -------------------------------------------------------------------------  ##
//  FLOW
// -------------------------------------------------------------------------  ##
init()
start()

console.groupEnd(title);
