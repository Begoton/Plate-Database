let cars = ["Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW",
     "Bugatti", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Citroën", "Dodge",
      "Ferrari", "Fiat", "Ford", "Genesis", "GMC", "Honda", "Hyundai", "Infiniti",
       "Jaguar", "Jeep", "Kia", "Lamborghini", "Land Rover", "Lexus", "Lincoln",
        "Maserati", "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi",
         "Nissan", "Pagani", "Peugeot", "Porsche", "Ram", "Renault", "Rolls-Royce",
          "Saab", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo",
];
let results = [];
let selectedCar;
let allCars = [];
allCars = JSON.parse(localStorage.getItem('cars'));
if(allCars == null)
{
    allCars = [];
}

//alert(allCars[0].plate);
document.getElementById('search').addEventListener('keydown', e => 
{
    UpdateResults();
}
)


// quick generation for search selection box
for(let i = 0; i < cars.length; i++)
{
    const box = document.createElement('div');
    box.style.height = '40px';
    box.style.width = '100%';
    box.style.backgroundColor = 'rgb(30, 30, 30)';
    box.style.textAlign = 'center';
    box.innerHTML = cars[i];
    box.style.marginBottom = '5px';
    box.style.color = 'white';
    box.onclick = () => 
    {
        document.getElementById('SelMake').innerHTML = 'Selected make : ' + box.innerHTML;
        selectedCar = box.innerHTML;
    }
    box.style.cursor = 'pointer';
    document.getElementById('resultbox').appendChild(box);
    results.push(box);
}


// Car make search system

function UpdateResults()
{
    let content = document.getElementById('search').value;
    for(let i = 0; i < cars.length; i++)
    {
        if(cars[i].toLowerCase().includes(content.toLowerCase()))
        {
            results[i].style.display = 'block';
        } else 
        {
            results[i].style.display = 'none';
        }
    }
}

// Car specifics

class Car
{
    constructor(plate, color, make, notes)
    {
        this.plate = plate;
        this.color = color;
        this.make = make;
        this.notes = notes;
    }
}

function AppendCar(plate, color, make, notes)
{
    if(plate == "")
    {
        alert("Car must have a plate number!");
        return;
    }
    let result = CheckForClones(plate);
    if(result != -1)
    {
        CloneScreen(result);
        ClearAll();
        return;
    }
    ClearAll();
    let car = new Car(plate, color, make, notes);
    allCars.push(car);
    localStorage.setItem('cars', JSON.stringify(allCars));
}

function CheckForClones(newPlate) 
{
    for(let i = 0; i < allCars.length; i++)
    {
        if(allCars[i].plate.toLowerCase() == newPlate.toLowerCase())
        {
            return i;
        }
    }
    return -1;
}


function CloneScreen(index)
{
    document.getElementById('clone').style.display = 'block';
    document.getElementById('clone_plate').innerHTML = "plate: " + allCars[index].plate;
    document.getElementById('clone_color').innerHTML = 'color: ' + allCars[index].color;
    document.getElementById('clone_make').innerHTML = 'make: ' + allCars[index].make;
    document.getElementById('clone_notes').innerHTML = 'notes: ' + allCars[index].notes;

    document.getElementById('cplate').innerHTML = 'plate: ' +  document.getElementById('plate').value;
    document.getElementById('ccolor').innerHTML = 'color: ' + document.getElementById('color').value;
    document.getElementById('cmake').innerHTML = 'make: ' + selectedCar;
    document.getElementById('cnotes').innerHTML = 'notes: ' + document.getElementById('notes').value;
}

function GenerateAllItems()
{
    document.getElementById('allItems').style.display = 'block';
    document.getElementById('SIB').innerHTML = '';

    if(allCars.length == 0) return;

    for(let i = 0; i < allCars.length; i++)
    {
        const item = document.createElement('div');
        item.style.height = '30px';
        item.style.width = '100%';
        item.style.border = '1px solid gray';
        item.innerHTML = allCars[i].plate;
        item.style.fontFamily = 'monospace';
        item.style.marginBottom = '5px';
        const button = document.createElement('button');
        button.innerHTML = 'x';
        button.style.float = 'right';
        button.onclick = () => 
        {
            allCars.splice(i, 1);
            localStorage.setItem('cars', JSON.stringify(allCars));
            GenerateAllItems();
        }
        item.appendChild(button);
        document.getElementById('SIB').appendChild(item);
    }
}

function ClearAll()
{
    document.getElementById('plate').value = '';
    document.getElementById('color').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('search').value = '';
}

// Other
document.getElementById('close').onclick = () => 
{
    document.getElementById('clone').style.display = 'none';
}
document.getElementById('append').onclick = () => 
{
    AppendCar(
        document.getElementById('plate').value,
        document.getElementById('color').value,
        selectedCar,
        document.getElementById('notes').value
    );
}
document.getElementById('view').onclick = () => 
{
    GenerateAllItems();
}
document.getElementById('closeItems').onclick = () => 
{
    document.getElementById('allItems').style.display = 'none';
}