let computerNumber = 0; // 랜덤함수
let chances = 7;
let gameOver = false;
let userValueList = [];
let playButton = document.getElementById('play_button');
console.log(playButton);
let userInput = document.getElementById('user_input');
console.log(userInput);
let resultArea = document.getElementById('result_area');
let resetButton = document.querySelector('#reset_button')
let chanceArea = document.getElementById('chance_area')



/* 
document는 DOM트리의 최상위 객체이다.
DOM(Document Object Model)은 자바스트립트 입장에서 그저 일종의 문자열일 뿐인 HTML을 자바스크립트가 이해할 수 있게 객체의 형태로 바꿔둔것이다.
(Document를 HTML이라고 이해하면 편함..)이 DOM을 이제 자바스크립트가 마음대로 컨트롤 할 수 있어야 하는데, 이 때 필요한 기본 함수들과 
속성값을 제공해주는게 Document라는 객체이다.

Element selectors
자바스크립트가 HTML을 가져와서 다루기 위해서는 원하는 HTML 태그를 선택해야 하는데, document 객체에서 다양하게 선택하는 방식을 제공한다.

1.document.getElementsById : id로 선택
2.document.getElementsByClassName : class로 선택, 같은 class가 여러개 있을 경우 다 선택이 되어서 배열에 저장된다.
3.document.querySelector : id, class 둘 다 선택이 가능하고 좀더 디테일한 선택이 가능하다. 참고로 선택 가능한 값이 여러개 있을 경우 그중에 첫번째 태그 하나만 선택된다.
4.document.querySelectorALL : 선택 가능한 값이 여러개 있을 경우 모두 다 선택된다.
    - let userInput = document.querySelector("#user_input"); id = user_input 을 선택
    - let resultAreaImg = document.querySelector(".main_img"); class = main_img를 선택
    - let menus = document.querySelector("nav a"); nav 태그 하위에 있는 a태그를 선택  //태그이름 선택
*/

playButton.addEventListener('click', play);        // 객체.addEventListener('발생시킬 이벤트 이름', 이벤트 발생시에 실행시킬 함수) 
                                                   // 함수도 매개변수에 넘겨줄 수 있다.
//playButton.addEventListener('click', play());        // 버튼 누르지 않아도 새로고침에 함수가 실행되어 버림
resetButton.addEventListener('click', reset);
userInput.addEventListener('focus', focusInput);    // focus는 마우스 클릭에 따른 이벤트 실행
/*   userInput.addEventListener('focus', function(){userInput.value = "";});     */   //임명함수. 다른 곳에서 이 함수가 사용되어서는 안 된다.


function pickRandomNumber(){
    computerNumber = Math.floor(Math.random() * 100) + 1; //Math.random() * 100는 0~99까지
    console.log('정답', computerNumber);
}
pickRandomNumber();

/* 
Math : 
자바스크립트에서 유용한 객체 중 하나인 Math객체.
수학적으로 필요한 것은 왠만해서는 다 함수화 되어있다.

Math.random() : 0 ~ 1사이의 값을 반환(1에 근접한 값까지만 반환(100*하면 0~99까지). 1은 미포함.)
Math.floor()  : 소수점 버림
Math.ceil()   : 소수점 올림
Math.round()  : 소수점 반올림
Math.max()    : 여러개의 값 중 제일 큰값 반환
Math.min()    : 여러개의 값 중 제일 작은값 반환

등등등... 자세한 내용은 검색해서 찾아보면서 사용해봅시다!

*/

function play(){
    const userValue = userInput.value;  //value는 입력창안에 입력받은 값을 말함. js와 html이 연결되어 html의 입력창에 입력된 값이 userInput.value와 이어짐.
    
    if(userValue < 1 || 100 < userValue){
        resultArea.textContent = '1부터 100 사이의 숫자를 입력해주세요';
        return;
    }
    if(userValueList.includes(userValue)){
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요"
        return;
    }
    console.log(userValue);
    chances--;                          //상단에 변수로 선언했던 7개에서 차례로 감소
    userValueList.push(userValue);      //비워져 있던 userValueList에 userValue의 값이 차례대로 들어감. 순서를 조심해야함
    console.log('남은 기회', chances)
    chanceArea.textContent = `남은 기회 : ${chances}`;
    //chanceArea.textContent = '남은 기회 :' + chances;
    console.log(userValueList);
    if(userValue < computerNumber){
        console.log('up!!');
        resultArea.textContent = 'up!!'
    } else if(userValue > computerNumber){
        console.log('down!!');
        resultArea.textContent = 'down!!'
    } else{
        console.log('정답!!!!');
        resultArea.textContent = '정답!!!!'
        gameOver = true;            // 아래 마지막 if문 안의 gameOver이 true가 되면서 playButton을 비활성화 시켜주기 위해
    }
    if(chances == 0){
        gameOver = true;
    }
    if(gameOver == true){
        playButton.disabled = true;  //객체.disabled 비활성화시키는 속성, input태그에 부속된 속성
    }
    

}

/* 
다양한 노드의 속성값

textContent : 노드의 text 값을 반환
innerText : 노드의 text값을 반환. textContent랑 비슷하지만 textContent는 모든 요소를 반환하는 반면 innerText는 사람이 읽을 수 있는 
요소만 가져온다. (글자 사이에 스페이스가 많다면 textContent는 있는 그대로 가져오는 반면 innerText는 스페이스를 한칸만 남기고 가져온다.)
innerHTML : html 요소를 반환한다. 태그 속성도 모두 가져옴
*/
function focusInput(){
    userInput.value = "";
}
function reset(){                                              // playButton으로 변경되었던 변수들을 최상단의 원래 변수의 모습으로 리셋시켜주어야 함
    pickRandomNumber();
    userInput.value = '';
    resultArea.textContent = '결과가 나온다'
    gameOver = false;
    playButton.disabled = false;
    chances = 7;
    chanceArea.textContent = `남은 기회 : ${chances}`;
    userValueList = [];
}

