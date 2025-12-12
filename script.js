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

    }

    // Workout Modal Logic
    const workoutData = {
        hypertrophy: {
            title: "Hypertrophy Training",
            content: `
                <ul>
                    <li><strong>Goal:</strong> Maximize muscle size and growth.</li>
                    <li><strong>Rep Range:</strong> 8-12 reps per set.</li>
                    <li><strong>Rest:</strong> 60-90 seconds between sets.</li>
                    <li><strong>Key Focus:</strong> Time under tension and progressive overload.</li>
                    <li><strong>Best For:</strong> Bodybuilders and those looking to improve aesthetics.</li>
                </ul>
                <p>Hypertrophy training focuses on breaking down muscle fibers to stimulate repair and growth. It involves a mix of compound and isolation exercises.</p>
            `
        },
        cardio: {
            title: "Cardio & HIIT",
            content: `
                <ul>
                    <li><strong>Goal:</strong> Improve cardiovascular health and burn fat.</li>
                    <li><strong>Types:</strong> Steady-state (LISS) and High-Intensity Interval Training (HIIT).</li>
                    <li><strong>Benefits:</strong> increased stamina, heart health, and calorie burn.</li>
                    <li><strong>Frequency:</strong> 2-4 times per week depending on goals.</li>
                </ul>
                <p>HIIT involves short bursts of intense activity followed by rest, while steady-state cardio maintains a consistent effort level.</p>
            `
        },
        powerlifting: {
            title: "Powerlifting",
            content: `
                <ul>
                    <li><strong>Goal:</strong> Maximize raw strength in the "Big 3" lifts.</li>
                    <li><strong>Lifts:</strong> Squat, Bench Press, Deadlift.</li>
                    <li><strong>Rep Range:</strong> 1-5 reps per set.</li>
                    <li><strong>Rest:</strong> 3-5 minutes between sets.</li>
                    <li><strong>Focus:</strong> Moving maximum weight with proper form.</li>
                </ul>
                <p>Powerlifting is about pure strength. Training volume is lower, but intensity is very high.</p>
            `
        },
        calisthenics: {
            title: "Calisthenics",
            content: `
                <ul>
                    <li><strong>Goal:</strong> Master bodyweight control and functional strength.</li>
                    <li><strong>Exercises:</strong> Pull-ups, Push-ups, Dips, Muscle-ups, Levers.</li>
                    <li><strong>Benefits:</strong> minimal equipment needed, improves flexibility and coordination.</li>
                    <li><strong>Progression:</strong> Increasing leverage difficulty rather than adding external weight.</li>
                </ul>
                <p>Calisthenics builds a lean, functional physique and impressive body control.</p>
            `
        }
    };

    window.openModal = function(type) {
        const modal = document.getElementById('workout-modal');
        const title = document.getElementById('modal-title');
        const desc = document.getElementById('modal-description');
        const closeBtn = document.getElementById('close-modal');

        if (modal && workoutData[type]) {
            title.textContent = workoutData[type].title;
            desc.innerHTML = workoutData[type].content;
            modal.classList.add('active');

            // Close on click outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });

            // Close on button click
            if (closeBtn) {
                closeBtn.onclick = closeModal;
            }
        }
    };

    function closeModal() {
        const modal = document.getElementById('workout-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }


