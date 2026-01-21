const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;

function drawPoint(x, y) {
  ctx.lineTo(x, y);
  ctx.stroke();
}

canvas.onmousedown = () => {
  drawing = true;
  ctx.beginPath();
};

canvas.onmouseup = () => {
  drawing = false;
};

canvas.onmousemove = (e) => {
  if (!drawing) return;
  const op = { x: e.clientX, y: e.clientY };
  drawPoint(op.x, op.y);
  socket.emit('draw', op);
};

socket.on('draw', (op) => {
  drawPoint(op.x, op.y);
});

socket.on('sync', (ops) => {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  for (let op of ops) drawPoint(op.x, op.y);
});
