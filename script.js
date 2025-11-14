// Chart data for Daily and Weekly views
const chartData = {
    daily: [
        { day: 'S', height: 75, segments: [40, 25, 20, 15] },
        { day: 'M', height: 55, segments: [45, 20, 20, 15] },
        { day: 'T', height: 70, segments: [40, 30, 15, 15] },
        { day: 'W', height: 85, segments: [35, 35, 20, 10] },
        { day: 'T', height: 50, segments: [50, 25, 15, 10] },
        { day: 'F', height: 80, segments: [35, 30, 20, 15] },
        { day: 'S', height: 65, segments: [40, 25, 20, 15] }
    ],
    weekly: [
        { day: 'W1', height: 70, segments: [38, 28, 19, 15] },
        { day: 'W2', height: 65, segments: [42, 24, 18, 16] },
        { day: 'W3', height: 80, segments: [36, 32, 20, 12] },
        { day: 'W4', height: 60, segments: [44, 26, 17, 13] },
        { day: 'W5', height: 75, segments: [40, 28, 18, 14] },
        { day: 'W6', height: 55, segments: [46, 22, 19, 13] },
        { day: 'W7', height: 68, segments: [39, 27, 20, 14] }
    ]
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-option');
    const chartArea = document.querySelector('.chart-area');
    
    // Toggle button functionality
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update chart based on selection
            const view = this.textContent.toLowerCase();
            updateChart(view);
            
            // Add animation
            chartArea.style.opacity = '0';
            setTimeout(() => {
                chartArea.style.opacity = '1';
            }, 100);
        });
    });
    
    // Initialize with daily view
    updateChart('daily');
});

// Update chart function
function updateChart(view) {
    const data = chartData[view];
    const chartArea = document.querySelector('.chart-area');
    
    // Update average time and label
    const averageLabel = document.querySelector('.small-label');
    const averageTime = document.querySelector('.huge-time');
    
    if (view === 'daily') {
        averageLabel.textContent = 'Daily Average';
        averageTime.textContent = '8h 28m';
    } else {
        averageLabel.textContent = 'Weekly Average';
        averageTime.textContent = '58h 56m';
    }
    
    // Clear existing bars
    chartArea.innerHTML = '';
    
    // Create new bars
    data.forEach(item => {
        const barWrapper = document.createElement('div');
        barWrapper.className = 'bar-wrapper';
        
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = item.height + '%';
        
        // Create segments
        const colors = ['blue', 'purple', 'pink', 'green'];
        item.segments.forEach((segmentHeight, index) => {
            const segment = document.createElement('div');
            segment.className = `segment ${colors[index]}`;
            segment.style.height = segmentHeight + '%';
            bar.appendChild(segment);
        });
        
        const label = document.createElement('span');
        label.className = 'day-label';
        label.textContent = item.day;
        
        barWrapper.appendChild(bar);
        barWrapper.appendChild(label);
        chartArea.appendChild(barWrapper);
    });
}

// Add smooth transition to chart area
const style = document.createElement('style');
style.textContent = `
    .chart-area {
        transition: opacity 0.3s ease;
    }
    
    .bar-wrapper {
        animation: slideUp 0.5s ease forwards;
        opacity: 0;
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add staggered animation delay to bars
function addAnimationDelay() {
    const barWrappers = document.querySelectorAll('.bar-wrapper');
    barWrappers.forEach((wrapper, index) => {
        wrapper.style.animationDelay = `${index * 0.1}s`;
    });
}

// Create floating particles
function createParticles() {
    const particleCount = 20;
    const container = document.body;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent += `
    @keyframes float-particle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
createParticles();

// Call after chart update
const originalUpdateChart = updateChart;
updateChart = function(view) {
    originalUpdateChart(view);
    setTimeout(addAnimationDelay, 10);
};

// Add hover tooltips
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.bar-wrapper')) {
        const barWrapper = e.target.closest('.bar-wrapper');
        const bar = barWrapper.querySelector('.bar');
        const height = bar.style.height;
        
        // Create tooltip if it doesn't exist
        let tooltip = barWrapper.querySelector('.tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = `${height} of max`;
            tooltip.style.cssText = `
                position: absolute;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 4px 8px;
                border-radius: 6px;
                font-size: 11px;
                white-space: nowrap;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.2s;
            `;
            barWrapper.style.position = 'relative';
            barWrapper.appendChild(tooltip);
        }
        
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.bar-wrapper')) {
        const barWrapper = e.target.closest('.bar-wrapper');
        const tooltip = barWrapper.querySelector('.tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.remove(), 200);
        }
    }
});
