import { showRelatedWords } from './relatedWordsHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            const word = document.querySelector('input[type="text"]').value;
            showRelatedWords(word); 
            openModal($target);
        });
    });

    // click event added to child elements. it will close the modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // using keyboard to close all modals
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeAllModals();
        }
    });

    document.getElementById('relatedWordsBtn').addEventListener('click', function() {
        const word = document.querySelector('input[type="text"]').value;
        showRelatedWords(word);
        document.getElementById('relatedWordsModal').classList.add('is-active');
    });

    // Handle closing the modal
    document.querySelectorAll('.modal .delete, .modal .button').forEach(function(closeButton) {
        closeButton.addEventListener('click', function() {
            document.getElementById('relatedWordsModal').classList.remove('is-active');
        });
    });
});
