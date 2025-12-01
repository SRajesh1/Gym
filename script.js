document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Diet Plan Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const dietContents = document.querySelectorAll('.diet-content');

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
            targetContent.style.display = 'block';
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                targetContent.classList.add('active');
            }, 10);
        });
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(18, 18, 18, 0.98)';
            navbar.style.padding = '15px 0';
        } else {
            navbar.style.background = 'rgba(18, 18, 18, 0.95)';
            navbar.style.padding = '20px 0';
        }
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 5000); // Change slide every 5 seconds

    // Exercise Library Data
    const exercises = [
        { name: "Bench Press", group: "chest", desc: "Compound movement for chest strength.", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
        { name: "Push Ups", group: "chest", desc: "Bodyweight classic for chest and core.", img: "https://images.unsplash.com/photo-1598971639058-211a74a96ccc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
        { name: "Pull Ups", group: "back", desc: "Builds a wide back and strong grip.", img: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
        { name: "Deadlift", group: "back", desc: "The king of compound lifts for total body.", img: "https://images.unsplash.com/photo-1517963879466-e1b54ebd512d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
        { name: "Squats", group: "legs", desc: "Essential for leg size and strength.", img: "https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
        { name: "Lunges", group: "legs", desc: "Unilateral leg work for balance and muscle.", img: "https://images.unsplash.com/photo-1434608519344-49d77a699ded?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
        { name: "Overhead Press", group: "shoulders", desc: "Builds broad, strong shoulders.", img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
        { name: "Lateral Raises", group: "shoulders", desc: "Isolates the side delts for width.", img: "https://images.unsplash.com/photo-1532029837066-8049a3c50e11?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
        { name: "Bicep Curls", group: "arms", desc: "Classic isolation for arm size.", img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
        { name: "Tricep Dips", group: "arms", desc: "Bodyweight move for horseshoe triceps.", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
        { name: "Plank", group: "core", desc: "Static hold for core stability.", img: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
        { name: "Crunches", group: "core", desc: "Targets the upper abs.", img: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
    ];

    const exerciseGrid = document.getElementById('exercise-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderExercises(filter) {
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
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderExercises(btn.getAttribute('data-filter'));
        });
    });

    // BMI Calculator
    const calculateBtn = document.getElementById('calculate-bmi');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiScore = document.querySelector('.bmi-score');
    const bmiText = document.querySelector('.bmi-text');

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

});
