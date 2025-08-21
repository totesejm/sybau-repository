document.addEventListener('DOMContentLoaded', () => {
    // Contact Form Submission Alert
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Thanks for your message! I\'ll get back to you soon!');
            contactForm.reset();
        });
    }

    // Portfolio Background Color Change on Project Click
    const portfolioSection = document.getElementById('portfolio');
    const glassCards = document.querySelectorAll('.glass-card');
    const backgroundMusic = document.getElementById('backgroundMusic');

    if (portfolioSection && glassCards.length > 0) {
        glassCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove any existing project color classes
                portfolioSection.classList.remove(
                    'project-endless-devotion',
                    'project-marc-x-monica',
                    'project-endless-impact'
                );

                // Get the project ID and apply the corresponding color class
                const projectId = card.dataset.projectId;
                switch(projectId) {
                    case 'endless-devotion':
                        portfolioSection.classList.add('project-endless-devotion');
                        break;
                    case 'marc-x-monica':
                        portfolioSection.classList.add('project-marc-x-monica');
                        break;
                    case 'endless-impact':
                        portfolioSection.classList.add('project-endless-impact');
                        break;
                }

                // Stop any currently playing videos and open the correct modal
                document.querySelectorAll('.modal video').forEach(video => {
                    video.pause();
                });

                let modalId;
                switch(projectId) {
                    case 'endless-devotion':
                        modalId = 'endlessDevotionModal';
                        break;
                    case 'marc-x-monica':
                        modalId = 'marcXMonicModal';
                        break;
                    case 'endless-impact':
                        modalId = 'endlessImpactModal';
                        break;
                    default:
                        return;
                }

                const myModal = new bootstrap.Modal(document.getElementById(modalId));
                myModal.show();

                // Reset background color when modal is closed
                document.getElementById(modalId).addEventListener('hidden.bs.modal', () => {
                    portfolioSection.classList.remove(
                        'project-endless-devotion',
                        'project-marc-x-monica',
                        'project-endless-impact'
                    );
                });
            });
        });
    }

    // Music Control Functionality
    const musicToggle = document.getElementById('musicToggle');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');

    if (backgroundMusic && musicToggle) {
        // Initially set to paused state
        backgroundMusic.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';

        musicToggle.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            } else {
                backgroundMusic.pause();
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            }
        });

        // Attempt to play the music (with user interaction)
        document.body.addEventListener('click', function firstInteraction() {
            // This will only work after user interaction
            backgroundMusic.play().then(() => {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            }).catch(error => {
                console.log('Autoplay prevented:', error);
            });
            // Remove the event listener after first interaction
            document.body.removeEventListener('click', firstInteraction);
        }, { once: true });
    }
});