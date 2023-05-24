document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const shapeSelect = document.querySelectorAll('input[name="shape"]');
    const colorInput = document.getElementById('color');
    const context = canvas.getContext('2d');
    let isDrawing = false;
    let startX, startY, endX, endY;
    let selectedShape = 'circle';
    const shapes = []; 

    
    function alignCanvas() {
        const container = document.getElementById('canvas-container');
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        canvas.width = containerWidth;
        canvas.height = containerHeight;
        drawShapes(); 
    }

    alignCanvas();

    window.addEventListener('resize', alignCanvas);

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mousedown', drawDefaultShape);
    canvas.addEventListener('mouseup', saveShape); 

    shapeSelect.forEach(shape => {
        shape.addEventListener('change', () => {
            selectedShape = shape.value;
            drawSelectedShape();
        });
    });

    function startDrawing(event) {
        if (event.button === 0) {
            isDrawing = true;
            startX = event.offsetX;
            startY = event.offsetY;
        }
    }

    function draw(event) {
        if (!isDrawing) return;
        endX = event.offsetX;
        endY = event.offsetY;
        drawShape();
    }

    function endDrawing() {
        if (isDrawing) {
            isDrawing = false;
        }
    }

    function drawShape() {
        const color = colorInput.value;

        context.clearRect(0, 0, canvas.width, canvas.height);
        drawShapes(); 
        context.fillStyle = color;

        if (selectedShape === 'circle') {
            const radius = Math.abs(endX - startX) / 2;
            context.beginPath();
            context.arc(startX + radius, startY + radius, radius, 0, 2 * Math.PI);
            context.fill();
        } else if (selectedShape === 'square') {
            const width = Math.abs(endX - startX);
            const height = Math.abs(endY - startY);
            context.fillRect(startX, startY, width, height);
        } else if (selectedShape === 'diamond') {
            context.beginPath();
            context.moveTo((startX + endX) / 2, startY);
            context.lineTo(endX, (startY + endY) / 2);
            context.lineTo((startX + endX) / 2, endY);
            context.lineTo(startX, (startY + endY) / 2);
            context.closePath();
            context.fill();
        } else if (selectedShape === 'right-triangle') {
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(startX, endY);
            context.lineTo(endX, endY);
            context.closePath();
            context.fill();
        }
    }

    function drawDefaultShape(event) {
        const color = colorInput.value;
        const defaultSize = 50;

        startX = event.offsetX - defaultSize / 2;
        startY = event.offsetY - defaultSize / 2;
        endX = startX + defaultSize;
        endY = startY + defaultSize;

        context.clearRect(0, 0, canvas.width, canvas.height);
        drawShapes(); 
        context.fillStyle = color;

        if (selectedShape === 'circle') {
            const radius = defaultSize / 2;
            context.beginPath();
            context.arc(startX + radius, startY + radius, radius, 0, 2 * Math.PI);
            context.fill();
        } else if (selectedShape === 'square') {
            context.fillRect(startX, startY, defaultSize, defaultSize);
        } else if (selectedShape === 'diamond') {
            context.beginPath();
            context.moveTo((startX + endX) / 2, startY);
            context.lineTo(endX, (startY + endY) / 2);
            context.lineTo((startX + endX) / 2, endY);
            context.lineTo(startX, (startY + endY) / 2);
            context.closePath();
            context.fill();
        } else if (selectedShape === 'right-triangle') {
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(startX, endY);
            context.lineTo(endX, endY);
            context.closePath();
            context.fill();
        }
    }

    function saveShape() {
        const color = colorInput.value;
        const shape = {
            type: selectedShape,
            startX,
            startY,
            endX,
            endY,
            color
        };
        shapes.push(shape); 
    }

    function drawShapes() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        shapes.forEach(shape => {
            context.fillStyle = shape.color;

            if (shape.type === 'circle') {
                const radius = Math.abs(shape.endX - shape.startX) / 2;
                const centerX = shape.startX + radius;
                const centerY = shape.startY + radius;

                context.beginPath();
                context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                context.fill();
            } else if (shape.type === 'square') {
                const width = Math.abs(shape.endX - shape.startX);
                const height = Math.abs(shape.endY - shape.startY);

                context.fillRect(shape.startX, shape.startY, width, height);
            } else if (shape.type === 'diamond') {
                context.beginPath();
                context.moveTo((shape.startX + shape.endX) / 2, shape.startY);
                context.lineTo(shape.endX, (shape.startY + shape.endY) / 2);
                context.lineTo((shape.startX + shape.endX) / 2, shape.endY);
                context.lineTo(shape.startX, (shape.startY + shape.endY) / 2);
                context.closePath();
                context.fill();
            } else if (shape.type === 'right-triangle') {
                context.beginPath();
                context.moveTo(shape.startX, shape.startY);
                context.lineTo(shape.startX, shape.endY);
                context.lineTo(shape.endX, shape.endY);
                context.closePath();
                context.fill();
            }
        });
    }
});
