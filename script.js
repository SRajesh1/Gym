window.initApp = function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Close mobile menu when clicking a link
    if (links) {
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Diet Plan Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const dietContents = document.querySelectorAll('.diet-content');

    if (tabBtns) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                // Hide all content
                dietContents.forEach(content => {
                    content.style.display = 'none';
                    content.classList.remove('active');
                });

                // Show target content
                const targetId = btn.getAttribute('data-target');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.style.display = 'block';
                    // Small delay to allow display:block to apply before opacity transition
                    setTimeout(() => {
                        targetContent.classList.add('active');
                    }, 10);
                }
            });
        });
    }

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(18, 18, 18, 0.98)';
                navbar.style.padding = '15px 0';
            } else {
                navbar.style.background = 'rgba(18, 18, 18, 0.95)';
                navbar.style.padding = '20px 0';
            }
        }
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }

    if (slides.length > 0) {
        setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Exercise Library Data
    const exercises = [
        { name: "Bench Press", group: "chest", desc: "Compound movement for chest strength.", img: "./images/BenchPress.jpg" },
        { name: "Push Ups", group: "chest", desc: "Bodyweight classic for chest and core.", img: "./images/PushUp.jpg" },
        { name: "Pull Ups", group: "back", desc: "Builds a wide back and strong grip.", img: "./images/Pullup.jpg" },
        { name: "Deadlift", group: "back", desc: "The king of compound lifts for total body.", img: "./images/Deadlift.jpg" },
        { name: "Squats", group: "legs", desc: "Essential for leg size and strength.", img: "./images/Sqats.jpg" },
        { name: "Lunges", group: "legs", desc: "Unilateral leg work for balance and muscle.", img: "./images/Lunges.jpg" },
        { name: "Overhead Press", group: "shoulders", desc: "Builds broad, strong shoulders.", img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
        { name: "Lateral Raises", group: "shoulders", desc: "Isolates the side delts for width.", img: "./images/LateralRaises.jpg" },
        { name: "Bicep Curls", group: "arms", desc: "Classic isolation for arm size.", img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
        { name: "Tricep Dips", group: "arms", desc: "Bodyweight move for horseshoe triceps.", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
        { name: "Plank", group: "core", desc: "Static hold for core stability.", img: "./images/Plank.jpg" },
        { name: "Crunches", group: "core", desc: "Targets the upper abs.", img: "./images/Crunches.jpg" }
    ];

    const exerciseGrid = document.getElementById('exercise-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderExercises(filter) {
        if (!exerciseGrid) return;
        exerciseGrid.innerHTML = '';
        const filtered = filter === 'all' ? exercises : exercises.filter(ex => ex.group === filter);
        
        filtered.forEach(ex => {
            const card = document.createElement('div');
            card.className = 'exercise-card';
            card.innerHTML = `
                <div class="exercise-img" style="background-image: url('${ex.img}')"></div>
                <div class="exercise-info">
                    <span class="muscle-group">${ex.group}</span>
                    <h4>${ex.name}</h4>
                    <p>${ex.desc}</p>
                </div>
            `;
            exerciseGrid.appendChild(card);
        });
    }

    // Initial Render
    renderExercises('all');

    // Filter Click Event
    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderExercises(btn.getAttribute('data-filter'));
            });
        });
    }

    // BMI Calculator
    const calculateBtn = document.getElementById('calculate-bmi');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiScore = document.querySelector('.bmi-score');
    const bmiText = document.querySelector('.bmi-text');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const height = parseFloat(heightInput.value);
            const weight = parseFloat(weightInput.value);

            if (height && weight) {
                const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
                bmiScore.textContent = bmi;

                let category = '';
                let color = '';

                if (bmi < 18.5) {
                    category = 'Underweight';
                    color = '#ffc107'; // Yellow
                } else if (bmi < 25) {
                    category = 'Normal Weight';
                    color = '#D4FF00'; // Green (Theme)
                } else if (bmi < 30) {
                    category = 'Overweight';
                    color = '#ff9800'; // Orange
                } else {
                    category = 'Obese';
                    color = '#f44336'; // Red
                }

                bmiText.textContent = category;
                bmiScore.style.color = color;
            } else {
                bmiText.textContent = "Please enter valid details";
                bmiScore.textContent = "--";
                bmiScore.style.color = "var(--primary-color)";
            }
        });
    }

};
