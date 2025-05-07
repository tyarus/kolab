// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Music Player Elements
    const playButton = document.querySelector('.play-btn');
    const progressBar = document.querySelector('.progress');
    const volumeControl = document.querySelector('.volume-control input');
    const currentTimeEl = document.querySelector('.time-info span:first-child');
    const durationEl = document.querySelector('.time-info span:last-child');
    const musicCards = document.querySelectorAll('.music-card');
    const playlistCards = document.querySelectorAll('.playlist-card');
    const genreCards = document.querySelectorAll('.genre-card');
    const artistCards = document.querySelectorAll('.artist-card');
    
    // Player State
    let isPlaying = false;
    let currentSong = {
        title: 'Judul Lagu',
        artist: 'Nama Artis',
        duration: 225, // in seconds
        currentTime: 0
    };

    // Play/Pause Function
    playButton.addEventListener('click', function() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
            startProgressAnimation();
        } else {
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            stopProgressAnimation();
        }
    });

    // Progress Bar Animation
    let progressInterval;
    function startProgressAnimation() {
        clearInterval(progressInterval);
        progressInterval = setInterval(function() {
            currentSong.currentTime++;
            if (currentSong.currentTime >= currentSong.duration) {
                currentSong.currentTime = 0;
                isPlaying = false;
                playButton.innerHTML = '<i class="fas fa-play"></i>';
                clearInterval(progressInterval);
            }
            updateProgressBar();
        }, 1000);
    }

    function stopProgressAnimation() {
        clearInterval(progressInterval);
    }

    function updateProgressBar() {
        const percentage = (currentSong.currentTime / currentSong.duration) * 100;
        progressBar.style.width = `${percentage}%`;
        
        // Update time display
        currentTimeEl.textContent = formatTime(currentSong.currentTime);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
    }

    // Initialize time display
    currentTimeEl.textContent = formatTime(currentSong.currentTime);
    durationEl.textContent = formatTime(currentSong.duration);

    // Volume Control
    volumeControl.addEventListener('input', function() {
        const volume = this.value;
        // In a real app, we would set the audio volume here
        console.log(`Volume set to: ${volume}%`);
    });

    // Add event listeners to music cards
    musicCards.forEach(card => {
        card.addEventListener('click', function() {
            const songTitle = this.querySelector('h3').textContent;
            const artistName = this.querySelector('p').textContent;
            changeSong(songTitle, artistName);
        });
    });

    function changeSong(title, artist) {
        // Update song info in player
        document.querySelector('.song-details h3').textContent = title;
        document.querySelector('.song-details p').textContent = artist;
        
        // Reset player state
        currentSong.title = title;
        currentSong.artist = artist;
        currentSong.currentTime = 0;
        
        // Start playing
        isPlaying = true;
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
        updateProgressBar();
        startProgressAnimation();
        
        // Scroll to player (nice UX touch)
        document.getElementById('player').scrollIntoView({ behavior: 'smooth' });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const headerHeight = document.querySelector('header').offsetHeight;
            
            window.scrollTo({
                top: targetSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        });
    });

    // Hover effects for playlists
    playlistCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Genre card interactions
    genreCards.forEach(card => {
        card.addEventListener('click', function() {
            const genre = this.querySelector('h3').textContent;
            alert(`Anda memilih genre ${genre}. Memuat lagu-lagu ${genre}...`);
        });
    });

    // Artist card interactions
    artistCards.forEach(card => {
        card.addEventListener('click', function() {
            const artist = this.querySelector('h3').textContent;
            alert(`Anda memilih artis ${artist}. Memuat profil ${artist}...`);
        });
    });

    // Search functionality
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    searchButton.addEventListener('click', function() {
        performSearch();
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === '') return;
        
        alert(`Mencari "${searchTerm}"... Fitur pencarian sedang dalam pengembangan.`);
        
        // Reset search input
        searchInput.value = '';
    }
    
    // Add animation to the hero section
    const heroSection = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (scrollPosition < 500) {
            const opacity = 1 - (scrollPosition / 500) * 0.5;
            heroSection.style.opacity = opacity;
        }
    });
    
    // Progress bar interaction
    const progressBarContainer = document.querySelector('.progress-bar');
    progressBarContainer.addEventListener('click', function(e) {
        const clickPosition = e.offsetX / this.offsetWidth;
        currentSong.currentTime = Math.floor(clickPosition * currentSong.duration);
        updateProgressBar();
        
        if (isPlaying) {
            stopProgressAnimation();
            startProgressAnimation();
        }
    });
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.footer-newsletter form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input');
        const email = emailInput.value.trim();
        
        if (email === '') {
            alert('Silakan masukkan alamat email Anda.');
            return;
        }
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Silakan masukkan alamat email yang valid.');
            return;
        }
        
        alert(`Terima kasih telah berlangganan newsletter kami dengan email: ${email}`);
        emailInput.value = '';
    });
    
    // Simulate loading data
    function simulateLoading() {
        const sections = [
            document.getElementById('trending'),
            document.getElementById('genres'),
            document.getElementById('artists'),
            document.getElementById('playlists')
        ];
        
        sections.forEach(section => {
            section.style.opacity = '0.5';
        });
        
        setTimeout(function() {
            sections.forEach(section => {
                section.style.opacity = '1';
                section.style.transition = 'opacity 0.5s ease';
            });
        }, 1000);
    }
    
    // Call simulate loading when page loads
    simulateLoading();
    
    // Responsive navigation for mobile (hamburger menu would be implemented here)
    function setupResponsiveNav() {
        // This would typically toggle a mobile menu
        // For this demo, we'll just log to console
        console.log('Responsive navigation would be toggled here');
    }
    
    // Music visualizer effect (simplified version)
    function setupMusicVisualizer() {
        const visualizerContainer = document.createElement('div');
        visualizerContainer.className = 'visualizer-container';
        visualizerContainer.style.cssText = `
            position: absolute;
            bottom: 100%;
            left: 0;
            width: 100%;
            height: 30px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            gap: 2px;
            padding: 0 30px;
            overflow: hidden;
        `;
        
        document.querySelector('.music-player').appendChild(visualizerContainer);
        
        // Create visualizer bars
        for (let i = 0; i < 50; i++) {
            const bar = document.createElement('div');
            bar.className = 'visualizer-bar';
            bar.style.cssText = `
                width: 4px;
                height: ${Math.floor(Math.random() * 20) + 5}px;
                background-color: #1DB954;
                transition: height 0.2s ease;
            `;
            visualizerContainer.appendChild(bar);
        }
        
        // Animate visualizer when playing
        setInterval(function() {
            if (isPlaying) {
                const bars = document.querySelectorAll('.visualizer-bar');
                bars.forEach(bar => {
                    bar.style.height = `${Math.floor(Math.random() * 20) + 5}px`;
                });
            }
        }, 200);
    }
    
    // Initialize visualizer
    setupMusicVisualizer();
    
    // Add music loading effect when clicking play
    playButton.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    playButton.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Theme toggle functionality (could be expanded)
    function addThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.className = 'theme-toggle';
        themeToggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1001;
            background: #282828;
            border: none;
            color: #ffffff;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(themeToggle);
        
        let darkTheme = true;
        themeToggle.addEventListener('click', function() {
            darkTheme = !darkTheme;
            if (darkTheme) {
                document.body.style.backgroundColor = '#121212';
                document.body.style.color = '#ffffff';
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.body.style.backgroundColor = '#f8f9fa';
                document.body.style.color = '#212529';
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                // This would need more detailed theme switching in a real app
            }
        });
    }
    
    // Call theme toggle setup
    addThemeToggle();
});