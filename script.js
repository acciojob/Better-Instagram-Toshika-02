
const divs = document.querySelectorAll('.image');

        // Enhance responsiveness with grid-based layout:
        parent.style.display = 'grid';
        parent.style.gridTemplateColumns = 'repeat(3, 1fr)';

        // Add initial images (assuming image paths are in style.css):
        for (let i = 0; i < divs.length; i++) {
            divs[i].style.backgroundImage = `url(image${i + 1}.jpg)`;
        }

        // Optimized drag and drop implementation:
        divs.forEach(div => {
            div.addEventListener('dragstart', dragStart);
            div.addEventListener('dragover', dragOver);
            div.addEventListener('drop', drop);
        });

        function dragStart(event) {
            event.dataTransfer.setData('text/plain', event.target.id);
            event.target.classList.add('dragging');
        }

        function dragOver(event) {
            event.preventDefault(); // Allow drop
            if (event.target !== event.currentTarget) {
                event.target.classList.add('drop-over');
            }
        }

        function drop(event) {
            event.preventDefault();
            const draggedId = event.dataTransfer.getData('text/plain');
            const draggedElement = document.getElementById(draggedId);
            const dropZone = event.target;

            if (draggedElement !== dropZone) {
                // Perform element swap:
                draggedElement.parentNode.insertBefore(dropZone, draggedElement);
                dropZone.parentNode.insertBefore(draggedElement, dropZone);

                // Swap background images (assuming they're set using 'url()'):
                const tempImage = draggedElement.style.backgroundImage;
                draggedElement.style.backgroundImage = dropZone.style.backgroundImage;
                dropZone.style.backgroundImage = tempImage;
            }

            // Clear visual feedback:
            draggedElement.classList.remove('dragging');
            dropZone.classList.remove('drop-over');
        }


