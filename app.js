let btnEl = document.getElementById('btn');
let textEl = document.getElementById('text');
let textEl2 = document.getElementById('text2');
let listUrl = ''; //создаю пустую переменную для добавления списка картинок в дальнейшем

function getList() {

    //Получаю данные из двух input и преобразую их сразу в тип number (через унарный плюс)
    let limitEl = +document.getElementById('limit').value;
    let pageEl = +document.getElementById('page').value;

    //Выполняю проверку всех условий
    if (pageEl >= 1 && pageEl <= 10 && limitEl >= 1 && limitEl <= 10)
    {
        //если оба value соответствуют всем условиям, тогда создаю и отправляю запрос
        textEl.innerHTML = 'Все верно';
        let url = `https://picsum.photos/v2/list?page=${pageEl}&limit=${limitEl}`;
        fetch(url)
            .then((response)=>{
                //получаю ответ и узнаю его статус
                alert('Статус запрос ' + response.status);

                //декодирую ответ  в формате JSON
                return response.json();
            })
            .then((result) => {
                //записываю полученные данные в localstorage
                result.forEach(item => {
                    //создаю p для каждого элемента и прописываю в него полученный url
                    let imgUrl = `<div class="img-url">
                    <p>${item.url}</p>
                    <p>${item.author}</p>
                    </div>`;

                    //собираю все элементы
                    listUrl = listUrl + imgUrl;
                    console.log(item.url);
                })

                    //добавляю полученный массив к div с id textEl2
                textEl2.innerHTML = listUrl;
                localStorage.setItem('myKey', listUrl);
            })
            .catch((error) => {
                //обрабатываю и вывожу ошибку
                alert('Ошибка ' + error.status);
            })


    }
    else
        if (pageEl >= 1 && pageEl <= 10)
    {
        textEl.innerHTML = 'Лимит вне диапазона от 1 до 10';
    }
    else
        if (limitEl >= 1 && limitEl <= 10)
        {
            textEl.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
        }
    else{
            textEl.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
        }
}

//получаю данные из ключа, чтобы после перезагрузки страницы список последних полученных картинок оставался
textEl2.innerHTML = localStorage.getItem('myKey');

//навешиваю функцию на кнопку

btnEl.addEventListener(
    'click',
    getList
)





