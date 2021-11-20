const container=document.querySelector('.container');
const count=document.getElementById('count');
const amount=document.getElementById('amount');
const select=document.getElementById('movie');
const seats=document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();

container.addEventListener('click',function(e) {
	if(e.target.classList.contains('seat')&& !e.target.classList.contains('reserved')){ // dolu olan koltukları almaması için reserved clasıyla onlar dışındakilerin tıklanılabilir olmasını sağladık
	e.target.classList.toggle('selected');
	//seat clasına sahip elemanlar için tıklanılabilir özelliği tıklanınca seçilir veya seçilmeden çıkarma
  calculateTotal()
	}

});

select.addEventListener('change',function(e){
	calculateTotal();
	
});
function calculateTotal(){
	const selectedSeats=container.querySelectorAll('.seat.selected');
	const selectedSeatsArr=[];
const seatsArr=[];
selectedSeats.forEach(function(seat){
	selectedSeatsArr.push(seat);
});


seats.forEach(function(seat){
	seatsArr.push(seat);
});

let selectedSeatİndexs=selectedSeatsArr.map(function(seat){
	return seatsArr.indexOf(seat); //seçilen elemanların index numarasını verir
})
	console.log(selectedSeatİndexs);
	 let selectedSeatCount=selectedSeats.length;
   count.innerText=selectedSeatCount;
   amount.innerText=selectedSeatCount * select.value; // secilen koltuk adedine ve filme göre fiyat bilgisini hesaplayan fonksiyon

saveToLocalStorage(selectedSeatİndexs);
}

function getFromLocalStorage(){
const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));

if(selectedSeats !=null && selectedSeats.length>0){
	seats.forEach(function(seat,index) {
	if(selectedSeats.indexOf(index)>-1){
		seat.classList.add('selected');
	}
});
}


const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');

if (selectedMovieIndex!=null){
	select.selectedIndex=selectedMovieIndex;
}
}

function saveToLocalStorage(indexs){
	localStorage.setItem('selectedSeats',JSON.stringify(indexs));
localStorage.setItem('selectedMovieİndex',select.selectedIndex); //local storage kaydetme

}


