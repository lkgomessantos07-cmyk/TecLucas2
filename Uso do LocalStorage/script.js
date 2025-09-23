document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroForm');
    const infoDisplay = document.getElementById('infoDisplay');
    
    
    displayStoredInfo();
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const altura = document.getElementById('altura').value;
        
       
        const user = {
            nome: nome,
            idade: idade,
            altura: altura
        };
        
   
        localStorage.setItem('userInfo', JSON.stringify(user));
        
       
        displayStoredInfo();
       
        form.reset();
    });
    
    function displayStoredInfo() {
        const storedUser = localStorage.getItem('userInfo');
        
        if (storedUser) {
            const user = JSON.parse(storedUser);
            infoDisplay.innerHTML = `
                <p><strong>Nome:</strong> ${user.nome}</p>
                <p><strong>Idade:</strong> ${user.idade}</p>
                <p><strong>Altura:</strong> ${user.altura} cm</p>
            `;
        } else {
            infoDisplay.innerHTML = '<p>Nenhuma informação armazenada ainda.</p>';
        }
    }
});



