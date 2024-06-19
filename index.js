document.getElementById('gradeForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const ne_cg = parseFloat(document.getElementById('ne_cg').value);
    const ne_prog = parseFloat(document.getElementById('ne_prog').value);
    const ne_ad = parseFloat(document.getElementById('ne_ad').value);

    const dpr_cg = parseFloat(document.getElementById('dpr_cg').value);
    const dpr_prog = parseFloat(document.getElementById('dpr_prog').value);
    const dpr_ad = parseFloat(document.getElementById('dpr_ad').value);

    const inn_input = parseFloat(document.getElementById('inn_input').value);
    const inn_midterm = parseFloat(document.getElementById('inn_midterm').value);
    const inn_final = parseFloat(document.getElementById('inn_final').value);

    function validateRow(row) {
        const inputs = row.querySelectorAll('input[type="number"]');
        let allEmpty = true;
        let allFilled = true;
        inputs.forEach(input => {
            if (input.value === '') {
                allFilled = false;
            } else {
                allEmpty = false;
            }
        });
        return allEmpty || allFilled;
    }

    const rows = document.querySelectorAll('.row');
    let valid = true;
    rows.forEach(row => {
        if (!validateRow(row)) {
            valid = false;
        }
    });

    if (!valid) {
        alert('Если вы начали заполнять блок с оценками, необходимо заполнить все три его поля.');
        return;
    }

    // Проверка значений полей dpr_ad, dpr_prog и dpr_cg
    function checkDprValue(value) {
        if (!isNaN(value) && value > 8) {
            alert("В случае, если за дисциплину-прериквизит выставлена оценка выше 8 баллов, для целей зачета используется оценка 8");
            return;
        }
    }

    checkDprValue(dpr_cg);
    checkDprValue(dpr_prog);
    checkDprValue(dpr_ad);

    function calculateFinalGrade(inn_first, inn_second, inn_third, ne_mark, dpr_mark, mark_to_update, stage) {
        if (isNaN(mark_to_update)) {
            return 0;
        }

        if (isNaN(dpr_mark)) {
            dpr_mark = 0;
        }

        if (inn_first - inn_second > 1 || inn_second - inn_third > 1 || inn_first - inn_third > 1) {
            return mark_to_update;
        } else {
            if (ne_mark < 4) {
                return mark_to_update;
            } else {
                if (stage == 1) {
                    return Math.max(~~inn_first, ne_mark, dpr_mark > 8 && ne_mark <= 8 ? 8 : dpr_mark);
                }
                if (stage == 2) {
                    return Math.max(~~inn_second, ne_mark, dpr_mark > 8 && ne_mark <= 8 ? 8 : dpr_mark);
                }
                if (stage == 3) {
                    return Math.max(~~inn_third, ne_mark, dpr_mark > 8 && ne_mark <= 8 ? 8 : dpr_mark);
                }
                throw Error('Этапа всего три');
            }
        }
    }

    const final_ne_cg = calculateFinalGrade(inn_input, inn_midterm, inn_final, ne_cg, Math.min(dpr_cg, 8), ne_cg, 1);
    const final_ne_prog = calculateFinalGrade(inn_input, inn_midterm, inn_final, ne_prog, Math.min(dpr_prog), ne_prog, 2);
    const final_ne_ad = calculateFinalGrade(inn_input, inn_midterm, inn_final, ne_ad, Math.min(dpr_ad), ne_ad, 3);

    const final_dpr_cg = calculateFinalGrade(inn_input, inn_midterm, inn_final, ne_cg, Math.min(dpr_cg, 8), Math.min(dpr_cg, 8), 1);
    const final_dpr_prog = calculateFinalGrade(inn_input, inn_midterm, inn_final, ne_prog, Math.min(dpr_prog), Math.min(dpr_prog), 2);
    const final_dpr_ad = calculateFinalGrade(inn_input, inn_midterm, inn_final, ne_ad, Math.min(dpr_ad), Math.min(dpr_ad), 3);

    document.getElementById('result_ne_cg').innerText = final_ne_cg.toFixed(2);
    document.getElementById('result_ne_prog').innerText = final_ne_prog.toFixed(2);
    document.getElementById('result_ne_ad').innerText = final_ne_ad.toFixed(2);

    document.getElementById('result_dpr_cg').innerText = final_dpr_cg.toFixed(2);
    document.getElementById('result_dpr_prog').innerText = final_dpr_prog.toFixed(2);
    document.getElementById('result_dpr_ad').innerText = final_dpr_ad.toFixed(2);
});