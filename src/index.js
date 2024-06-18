document.getElementById('gradeForm').addEventListener('submit', function(event) {
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
    
    // Формула расчета итоговой оценки
    function calculateFinalGrade(a, b, c, initial) {
        if (Math.abs(a - b) > 1 || Math.abs(b - c) > 1 || Math.abs(a - c) > 1) {
            return initial;
        } else {
            if (initial < 4) {
                return initial;
            } else {
                return Math.max(a, b, c);
            }
        }
    }

    const final_ne_cg = calculateFinalGrade(ne_cg, dpr_cg, inn_input, ne_cg);
    const final_ne_prog = calculateFinalGrade(ne_prog, dpr_prog, inn_midterm, ne_prog);
    const final_ne_ad = calculateFinalGrade(ne_ad, dpr_ad, inn_final, ne_ad);
    const final_dpr_cg = calculateFinalGrade(ne_cg, dpr_cg, inn_input, dpr_cg);
    const final_dpr_prog = calculateFinalGrade(ne_prog, dpr_prog, inn_midterm, dpr_prog);
    const final_dpr_ad = calculateFinalGrade(ne_ad, dpr_ad, inn_final, dpr_ad);

    document.getElementById('result_ne_cg').innerText = final_ne_cg.toFixed(2);
    document.getElementById('result_ne_prog').innerText = final_ne_prog.toFixed(2);
    document.getElementById('result_ne_ad').innerText = final_ne_ad.toFixed(2);
    document.getElementById('result_dpr_cg').innerText = final_dpr_cg.toFixed(2);
    document.getElementById('result_dpr_prog').innerText = final_dpr_prog.toFixed(2);
    document.getElementById('result_dpr_ad').innerText = final_dpr_ad.toFixed(2);
});
