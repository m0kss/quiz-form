document.addEventListener('DOMContentLoaded', () => {
	const quizFormBtns = document.querySelectorAll('.quiz-form__btn');

	let results = {
		'step-1': [],
		'step-2': [],
		'step-3': [],
		'step-4': []
	};

	function validateStep(stepNumber) {
		let stepElement = document.getElementById(`step-${stepNumber}`);
		let inputs = stepElement.querySelectorAll('.quiz-form__input');
		let checkboxes = stepElement.querySelectorAll('.real-checkbox');

		let stepIsValid = true;

		results[`step-${stepNumber}`] = Array.isArray(results[`step-${stepNumber}`]) ? [] : '';

		inputs.forEach(input => {
			const value = input.value.trim();
			let isValid = false;

			if (input.type === 'email') {
				const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				isValid = emailPattern.test(value);
			} else {
				isValid = value.length >= 3;
			}

			if (!isValid) {
				stepIsValid = false;
				input.classList.add('invalid');

				if (input.nextElementSibling) {
					input.nextElementSibling.style.opacity = '1';
				}
			} else {
				input.classList.remove('invalid');
				if (input.nextElementSibling) {
					input.nextElementSibling.style.opacity = '0';
				}

				results[`step-${stepNumber}`].push(value);
			}
		});

		if (checkboxes.length > 0) {
			let hasChecked = false;

			checkboxes.forEach(checkbox => {
				if (checkbox.checked) {
					hasChecked = true;
					results[`step-${stepNumber}`].push(checkbox.nextElementSibling.textContent.trim());
				}
			});

			if (!hasChecked) {
				stepIsValid = false;
			}
		}

		return stepIsValid;
	}

	if (quizFormBtns.length > 0) {
		quizFormBtns.forEach(btn => {
			btn.addEventListener('click', function (e) {
				e.preventDefault();
				let stepNumber = btn.dataset.step;

				if (validateStep(stepNumber)) {
					let stepElement = document.getElementById(`step-${stepNumber}`);
					if (stepNumber != 4) {
						stepElement.classList.remove('appear');
						stepElement.classList.add('hide');
						stepElement.nextElementSibling.classList.add('appear');
					} else {
						alert("Thank you!");
					}
				}

				console.log(results);
			});
		});
	}
});