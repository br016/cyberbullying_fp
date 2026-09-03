// Tabs
document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.steps').forEach(s=>s.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('steps-'+btn.dataset.tab).classList.add('active');
    });
  });

  // Quiz
  const questions = [
    {q:"Cyberbullying só é grave se acontecer com adultos.", a:false, exp:"Mentira. Acontece em qualquer idade, mas afeta especialmente crianças e adolescentes, que têm menos ferramentas para lidar com isso."},
    {q:"Bloquear e denunciar nas redes sociais realmente funciona.", a:true, exp:"Verdade. As plataformas têm equipes e sistemas para remover conteúdo e banir contas reincidentes."},
    {q:"Se eu só curti ou compartilhei, não fiz parte do problema.", a:false, exp:"Mentira. Curtir e compartilhar amplia o alcance do ataque e reforça quem está praticando."},
    {q:"Guardar prints das mensagens pode ajudar depois.", a:true, exp:"Verdade. Registros com data e hora são úteis para escolas, plataformas e, se necessário, autoridades."},
    {q:"Quem sofre cyberbullying deveria simplesmente sair da internet.", a:false, exp:"Mentira. Isso pune a vítima, não quem pratica. O caminho é agir sobre o comportamento, não isolar quem sofre."}
  ];
  let current = 0;

  function loadQuestion(){
    const item = questions[current];
    document.getElementById('quiz-progress').textContent = `Pergunta ${current+1} de ${questions.length}`;
    document.getElementById('quiz-question').textContent = item.q;
    document.getElementById('quiz-feedback').textContent = '';
    document.getElementById('quiz-next').style.display = 'none';
    const optsDiv = document.getElementById('quiz-options');
    optsDiv.innerHTML = '';
    [true,false].forEach(val=>{
      const b = document.createElement('button');
      b.className = 'quiz-opt';
      b.textContent = val ? 'Verdade' : 'Mito';
      b.addEventListener('click', ()=>answer(val, b));
      optsDiv.appendChild(b);
    });
  }

  function answer(val, btn){
    const item = questions[current];
    const opts = document.querySelectorAll('.quiz-opt');
    opts.forEach(o=>o.disabled = true);
    if(val === item.a){
      btn.classList.add('correct');
    } else {
      btn.classList.add('wrong');
      opts.forEach(o=>{ if(o.textContent === (item.a ? 'Verdade':'Mito')) o.classList.add('correct'); });
    }
    document.getElementById('quiz-feedback').textContent = item.exp;
    document.getElementById('quiz-next').style.display = (current < questions.length-1) ? 'inline-block' : 'none';
    if(current === questions.length-1){
      document.getElementById('quiz-feedback').textContent += " Isso encerra o teste — obrigado por participar!";
    }
  }

  document.getElementById('quiz-next').addEventListener('click', ()=>{
    current++;
    loadQuestion();
  });

  loadQuestion();