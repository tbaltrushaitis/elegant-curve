
const Parts  = 36
const Factor = 2
const Rounds = 1
const StartAngle = 0

const Points = Parts * Factor
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

const d = document
const b = d.body
const canvas = d.querySelector('#cvs-1')
const ctx = canvas.getContext('2d')

let cw = canvas.width  = 0.95 * b.clientWidth
let ch = canvas.height = 0.95 * b.clientHeight

const XC = cw / 2
const YC = ch / 2

let Radius    = Math.round(Math.min(cw, ch) * 0.90 / 2)
let AngleSkip = StartAngle * PI / 180
let AngleStep = 2 * PI / Parts

let arrPoints = [];

// -------------------------------------------------------------------------  ##

function init () {

  console.log(`Rounds = [${Rounds}]`)
  console.log(`Points = [Parts * Factor] = [${Parts} * ${Factor}] = [${Points}]`)
  console.log(`Radius = [${Radius}]`)
  console.log(`AngleSkip = [${AngleSkip}]`)
  console.log(`AngleStep = [${AngleStep}]`)

  genPoints()
  drawBase()
}

function start () {
  drawSectors()
  drawChords()
}

// let DataUrl = canvas.toDataURL()
// console.log(`DataUrl = [${DataUrl}]`);

// -------------------------------------------------------------------------  ##

function pset (ang, r) {
  let x = r * Math.cos(ang)
  let y = r * Math.sin(ang)
  return [Math.round(x), Math.round(y)]
}

// -------------------------------------------------------------------------  ##

function genPoints () {
  for (let ic = 1; ic <= Points; ic++) {
    let curAngle = AngleSkip + ic * AngleStep
    arrPoints.push( pset(curAngle, Radius) )
  }
  console.log(`POINTS LIST (${Points}):`);
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
  ctx.fillStyle = 'rgba(250, 0, 0, 0.8)'
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

  for (let ic = 0; ic < Parts; ic++) {
    let [xi, yi] = arrPoints[ic]
    ctx.lineTo(XC + xi, YC + yi)
    ctx.lineWidth = 2
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'blue'
    ctx.stroke()

    ctx.lineWidth = 1
    ctx.font = 'bold 20px Calibri'
    // ctx.textAlign = 'left'
    ctx.fillStyle = Colors[ ic % Colors.length ]
    ctx.fillText(1 + ic, XC + xi + 0.5 * (Parts - ic), YC + yi + 0.2 * (ic - Parts))
  }

  ctx.closePath()
}

// -------------------------------------------------------------------------  ##
//  CHORDES
// -------------------------------------------------------------------------  ##
function drawChords () {
  let title = `CHORDES List (${Parts * Rounds}):`
  console.groupCollapsed(title);

  ctx.lineWidth = 2
  ctx.strokeStyle = 'white'
  // ctx.strokeStyle = Colors[ ik % Colors.length ]

  for (let ic = 1; ic <= Parts * Rounds; ic++) {
    let ik1 = (ic - 1) % Parts
    let ik2 = (ic * Factor - 1) % Parts
    let [x1, y1] = arrPoints[ik1]
    let [x2, y2] = arrPoints[ik2]

    ctx.beginPath()
    ctx.moveTo(XC + x1, YC + y1)
    ctx.lineTo(XC + x2, YC + y2)
    ctx.stroke()
    ctx.closePath()

    console.log(`[${ic}]: [${ic} to ${ic * Factor}] === (${x1}, ${y1}) - (${x2}, ${y2})`)
  }

  console.groupEnd(title);
}

// -------------------------------------------------------------------------  ##
//  FLOW
// -------------------------------------------------------------------------  ##
init()
start()

console.groupEnd(title);
