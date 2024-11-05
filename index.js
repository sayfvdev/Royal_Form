const form = document.forms.namedItem('form');
const success = document.getElementById('success');
const error = document.getElementById('error');
const lbls = form.querySelectorAll('label');
const req_lbls = form.querySelectorAll('.required');
const clearB = document.querySelector('#clearButton').onclick = function (e) {
    e.preventDefault();
    document.querySelectorAll("#textInput").forEach(input => {
        input.value = "";
    });
}

const patterns = {
    email: /^((?!\.)[\w\-_.]*[^.])@(\w+)(\.\w+(\.\w+)?)$/i,
    name: /^[a-z ,.'-]+$/i,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
};

function validate(input, pattern) {
    return pattern.test(input.value);
}

req_lbls.forEach(label => {
    const input = label.querySelector('input');
    if (input) {
        const pattern = patterns[input.name];
        if (pattern) {
            input.onkeyup = () => {
                const isValid = validate(input, pattern);
                if (isValid) {
                    label.classList.remove('error');
                } else {
                    label.classList.add('error');
                }
            };
        }
    }
});

form.onsubmit = (event) => {
    event.preventDefault();
    const user = {};
    let successCount = 0;
    let errorCount = 0;

    lbls.forEach(label => {
        const input = label.querySelector('input');
        if (input) {
            const isRequired = label.classList.contains('required');
            const pattern = patterns[input.name];
            const hasValue = input.value.length > 0;

            user[input.name] = input.value;

            if (isRequired) {
                if (!hasValue || (pattern && !validate(input, pattern))) {
                    label.classList.add('error');
                    errorCount++;
                } else {
                    label.classList.remove('error');
                    successCount++;
                }
            } else if (hasValue) {
                successCount++;
            }
        }
    });

    success.textContent = `Success: ${successCount}`;
    error.textContent = `Error: ${errorCount}`;

    if (errorCount === 0) {
        console.log(user);
        alert('Form submitted successfully!');
    }
};

document.getElementById("fileInput").onchange = function() {
    const file = this.files[0];
    if (file) {
      const img = document.getElementById("preview");
      img.src = URL.createObjectURL(file);
      img.style.display = "block";
    }
  };