let score = 0

        let intervalId = null

        const gameTime = 50

        regressiveCount(gameTime)

        let cards = [
            {
                id: '1',
                hash: window.crypto.randomUUID().replaceAll("-", ""),
                img: '../img_dos_funcionarios_pc/Leide.jpg',
            },
            {
                id: '1',
                hash: window.crypto.randomUUID().replaceAll("-", ""),
                img: '../img_dos_funcionarios_pc/Leide.jpg',

            },
            {
                id: '2',
                hash: window.crypto.randomUUID().replaceAll("-", ""),
                img: '../img_dos_funcionarios_pc/Rhaudney.jpg',

            },
            {
                id: '2',
                hash: window.crypto.randomUUID().replaceAll("-", ""),
                img: '../img_dos_funcionarios_pc/Rhaudney.jpg',

            },
            {
                id: '3',
                hash: window.crypto.randomUUID().replaceAll("-", ""),
                img: '../img_dos_funcionarios_pc/Rosangela.jpg',

            },
            {
                id: '3',
                hash: window.crypto.randomUUID().replaceAll("-", ""),
                img: '../img_dos_funcionarios_pc/Rosangela.jpg',

            },
            {
                id: '4',
                hash: window.crypto.randomUUID().replaceAll("-", ""),
                img: '../img_dos_funcionarios_pc/Roberta.jpg',

            },
            {
                id: '4',
                hash: window.crypto.randomUUID().replaceAll("-", ""),
                img: '../img_dos_funcionarios_pc/Roberta.jpg',

            },
            {
                id: '5',
                hash: window.crypto.randomUUID().replaceAll("-", ""),
                img: '../img_dos_funcionarios_pc/Seu-joão.jpg',

            },
            {
                id: '5',
                hash: window.crypto.randomUUID().replaceAll("-", ""),
                img: '../img_dos_funcionarios_pc/Seu-joão.jpg',

            },
            {
                id: '6',
                hash: window.crypto.randomUUID().replaceAll("-", ""),
                img: '../img_dos_funcionarios_pc/Seu-Ronaldo.jpg',

            },
            {
                id: '6',
                hash: window.crypto.randomUUID().replaceAll("-", ""),
                img: '../img_dos_funcionarios_pc/Seu-Ronaldo.jpg',

            },
            {
                id: '7',
                hash: window.crypto.randomUUID().replaceAll("-", ""),
                img: '../img_dos_animais/Tucano.jpeg',

            },
            {
                id: '7',
                hash: window.crypto.randomUUID().replaceAll("-", ""),
                img: '../img_dos_animais/Tucano.jpeg',

            },
            {
                id: '8',
                hash: window.crypto.randomUUID().replaceAll("-", ""),
                img: '../img_dos_animais/Zebra.jpeg',

            },
            {
                id: '8',
                hash: window.crypto.randomUUID().replaceAll("-", ""),
                img: '../img_dos_animais/Zebra.jpeg',

            }
        ]

        cards = shuffleArray(cards)

        let start = 0

        const cardsContainer = document.getElementById('cards')
        
        let cartasAbertas = 0
        
        let primeiraCartaAberta = null
        
        let cartasCertas = 0
        
        function regressiveCount(count) {
            if (count < 16) {
                document.getElementById('contador').style.color = '#db3431';
                
                if (count % 2 != 0) {
                    document.getElementById('contador').style.color = '#771d1c';
                }
            }
            if (count < 0) {
                document.getElementById('perdesse').style.display = 'flex';
                const cardsElement = document.getElementById('cards');
                cardsElement.innerHTML = ''
                document.getElementById('returnButton').style.opacity = 0
                
                return

            }

            const contador = document.getElementById('contador')
            contador.innerHTML = count
            score = count


            const t = setTimeout(() => {

                count--;

                regressiveCount(count);
            }, 1000)

            intervalId = t
        }
        
        for (let i = 0; i < 4; i++) {
            const linha = document.createElement('div')
            linha.style.display = 'flex'
            for (let j = start; j < start + 4; j++) {
                const coluna = document.createElement('div')
                coluna.style.height = '20vh'
                coluna.style.margin = '5px'
                coluna.style.cursor = 'pointer'
                coluna.id = cards[j].hash
                coluna.className = 'card closed'
                coluna.onclick = () => flipCard(cards[j].hash)
                const img = document.createElement('img')
                img.setAttribute('src', '../img_dos_funcionarios_pc/flor_do_jm.png')
                img.id = cards[j].hash
                img.style.width = '100%'
                img.style.height = '100%'
                img.style.borderRadius = '25px'
                coluna.appendChild(img)
                linha.appendChild(coluna)
            }
            cardsContainer.children[0].appendChild(linha)
            start += 4
        }

        function flipCard(id) {
            const element = document.getElementById(id)
            if (Array.from(element.classList).includes('closed')) {
                const card = cards.find((c) => c.hash == id)
                element.children[0].setAttribute('src', card.img)
                element.classList.remove('closed')
                element.classList.add('opened')
                cartasAbertas++

                if (cartasAbertas == 1) {
                    primeiraCartaAberta = card

                } else {

                    if (primeiraCartaAberta.id == card.id) {
                        cartasAbertas = 0
                        element.classList.remove('opened')
                        document.getElementById(primeiraCartaAberta.hash).classList.remove('opened')
                        cartasCertas++
                    } else {

                        const cartasSelecionadas = document.querySelectorAll('.opened')
                        primeiraCartaAberta = null
                        cartasAbertas = 0
                        setTimeout(() => {
                            for (const carta of cartasSelecionadas) {
                                carta.children[0].setAttribute('src', '../img_dos_funcionarios_pc/flor_do_jm.png')
                                carta.classList.remove('opened')
                                carta.classList.add('closed')
                            }
                        }, 1000)

                    }
                }
                if (cartasCertas == 8) {
                    checkVictory()
                }

            }

        }

        function shuffleArray(cards) {
            const newArray = []

            const indices = []

            for (let i = 0; newArray.length != cards.length; i++) {
                const indice = Math.floor(Math.random() * cards.length);

                if (!indices.includes(indice)) {
                    newArray.push(cards[indice])
                    indices.push(indice)
                }
            }

            return newArray;
        }

        function checkVictory() {
            setTimeout(() => {
                const closedCards = document.querySelectorAll('.closed');
                if (closedCards.length === 0) {
                    document.getElementById('vitoria').style.display = 'flex';
                    const cardsElement = document.getElementById('cards');
                    cardsElement.innerHTML = ''
                    const resultado = document.getElementById('resultado')
                    resultado.innerHTML = 'Tempo de jogo: ' + (gameTime - score - 1) + ' segundos'

                    clearTimeout(intervalId)

                    showTableTimes()
                }
                
                document.getElementById('returnButton').style.opacity = 0

                document.getElementById('contador').style.color = 'gold';  
                
                document.getElementById('contador').style.webkitTextStrokeColor = 'black'; 

            }, 1000)

        }


        function handleSubmit(event) {
            event.preventDefault()

            const form = new FormData(event.target)

            const nickName = form.get('nickName')

            const userObj = {
                nickName,
                time: gameTime - score - 1
            }

            const users = JSON.parse(localStorage.getItem('users')) ?? []

            let userFound = null

            users.push(userObj)

            localStorage.setItem('users', JSON.stringify(users))

            event.target.reset()

            event.target

            document.getElementById('form').remove()

            document.getElementById('ranking').children[1].innerHTML = ''

            showTableTimes()
        }

        function showTableTimes() {
            let users = JSON.parse(localStorage.getItem('users')) ?? []

            const table = document.getElementById('ranking')

            users.sort((a, b) => a.time - b.time)

            users = users.slice(0, 5)
            
            let position = 0

            for (const user of users) {

                position++
                
                const row = document.createElement('tr')

                const tdPosition = document.createElement('td')
                
                tdPosition.innerHTML = position + 'º'

                const tdNickName = document.createElement('td')
                tdNickName.innerHTML = user.nickName

                const tdTime = document.createElement('td')
                tdTime.innerHTML = user.time

                row.append(tdPosition, tdNickName, tdTime)

                table.children[1].appendChild(row)

            }
        }