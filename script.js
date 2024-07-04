document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 1;
    const totalPages = 4;
    const timeLimit = 300;
    let timeLeft = timeLimit;
    let timer;

    startTimer();

    function showNextPage() {
        if (currentPage < totalPages) {
            document.getElementById(`page${currentPage}`).style.display = "none";
            currentPage++;
            document.getElementById(`page${currentPage}`).style.display = "block";
            updateNavigationButtons();
        }
    }

    function showPrevPage() {
        if (currentPage > 1) {
            document.getElementById(`page${currentPage}`).style.display = "none";
            currentPage--;
            document.getElementById(`page${currentPage}`).style.display = "block";
            updateNavigationButtons();
        }
    }

    function updateNavigationButtons() {
        document.getElementById("prev-btn").style.display = currentPage === 1 ? "none" : "inline-block";
        document.getElementById("next-btn").style.display = currentPage === totalPages ? "none" : "inline-block";
        document.getElementById("submit-btn").style.display = currentPage === totalPages ? "inline-block" : "none";
    }

    function startTimer() {
        timer = setInterval(function () {
            timeLeft--;
            document.getElementById("time").textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                document.getElementById("quiz-form").submit();
            }
        }, 1000);
    }

    document.getElementById("quiz-form").addEventListener("submit", function (event) {
        event.preventDefault();

        clearInterval(timer);

        const formData = new FormData(event.target);
        const correctAnswers = {
            q1: "c",
            q2: "b",
            q3: "c",
            q4: ["2", "3", "5"],
            q5: "h1",
            q6: "b",
            q7: "b",
            q8: "a",
            q9: ["2", "4"],
            q10: "color",
            q11: "a",
            q12: "b",
            q13: "a",
            q14: ["1", "3"],
            q15: "p",
            q16: "c",
            q17: "c",
            q18: "a",
            q19: ["1", "3"],
            q20: "font-size"
        };
        let score = 0;

        Object.keys(correctAnswers).forEach(question => {
            if (Array.isArray(correctAnswers[question])) {
                const selectedAnswers = formData.getAll(question);
                if (arraysEqual(correctAnswers[question], selectedAnswers)) {
                    score++;
                }
            } else {
                if (formData.get(question) === correctAnswers[question]) {
                    score++;
                }
            }
        });

        displayScore(score);
    });

    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        arr1.sort();
        arr2.sort();
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }

    function displayScore(score) {
        document.getElementById("quiz-form").style.display = "none";
        document.getElementById("result").style.display = "block";
        document.getElementById("result").innerHTML = `<h2>Your Score: ${score} / 20</h2>`;
    }

    document.getElementById("prev-btn").addEventListener("click", showPrevPage);
    document.getElementById("next-btn").addEventListener("click", showNextPage);
    updateNavigationButtons();
});
