(function ($) {

    document.addEventListener('DOMContentLoaded', function () {
        const content = document.getElementById('o_content');

        let imageModalId = 0;
        content.querySelectorAll('img').forEach(image => {
            // Enforce the presence of the `img-fluid` class on all images.
            image.classList.add('img-fluid', 'img-thumbnail');

            // Add a modal to each image that does not explicitly block it and has no target.
            if (!image.classList.contains('o-no-modal') && image.parentElement.tagName !== 'A') {
                const modalContainer = document.createElement('div');
                modalContainer.innerHTML = `<div class="modal fade" id="modal-${imageModalId}">
                       <div class="modal-dialog modal-dialog-centered">
                         <div class="modal-content">
                           <div class="modal-header">
                              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                           </div>
                           <div class="modal-body">
                              <img src="${image.src}" alt="${image.alt}" class="o-no-modal img-fluid img-thumbnail"/>
                           </div>
                         </div>
                       </div>
                     </div>
                `;
                image.parentNode.append(modalContainer);
                image.setAttribute('data-bs-toggle', 'modal');
                image.setAttribute('data-bs-target', `#modal-${imageModalId}`);
                imageModalId++;
            }
        });

        // Make all external links open in a new tab by default.
        content.querySelectorAll('a.external').forEach(externalLink => {
            externalLink.setAttribute('target', '_blank');
        })

        // Add extra classes to allow more control on the design of the toctrees
        const tocTreeWrapperEl = document.querySelector('.toctree-wrapper');
        let tocFirstLevelOnly = true;
        let tocFirstLevelAreLinks = true;

        // Add a class to all toctree-l1 if there is a 2nd level toctree inside.
        tocTreeWrapperEl?.querySelectorAll('.toctree-l1').forEach(tocl1 => {
            if (tocl1.querySelector('.toctree-l2')) {
                tocl1.classList.add('o_toc_contains_l2');
                tocFirstLevelOnly = false;
            }
            // Same logic is applied for tocl2 if there is a 3rd level inside their parent l1
            if (tocl1.querySelector('.toctree-l3')) {
                tocl1.querySelectorAll('.toctree-l2').forEach (tocl2 => {
                    tocl2.classList.add('o_toc_contains_l3');
                });
            }
            tocl1.querySelector('a').getAttribute('href') == '#' ? tocFirstLevelAreLinks = false : '';
        });
        // Swap tocl1 for tocl2 if they are only links without nested toc
        if (tocFirstLevelAreLinks && tocFirstLevelOnly) {
          tocTreeWrapperEl?.querySelectorAll('.toctree-l1').forEach(tocl1 => {
                tocl1.classList.replace('toctree-l1', 'toctree-l2');
            });
        }
    });

})();
