import { Box, MenuItem, Select, Button, Slider, Switch, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import bubbleSortGenerator from "./algorithms/bubbleSort";
import insertionSortGenerator from "./algorithms/insertionSort";
import selectionSortGenerator from "./algorithms/selectionSort";
import gnomeSortGenerator from "./algorithms/gnomeSort";
import ShuffleIcon from '@mui/icons-material/Shuffle';

const Home = () => {
  const [array, setArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [swappingIndices, setSwappingIndices] = useState();
  const [darkmode, setdarkmode] = useState(false);
  const [length, setLength] = useState(10);
  const [sortingAlgorithm, setSortingAlgorithm] = useState("bubbleSort");

  useEffect(() => {
    shuffleArray();
    toggleDarkMode();
  }, []);

  const handleSliderChange = (event, value) => {
    setLength(value);
  };

  const valuetext = (value) => {
    return `${value}`;
  };

  useEffect(() => {
    let newArray = Array.from({ length: length }, (_, index) => index + 1);
    setArray(newArray);
  }, [length]);


  const marks = [
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
    { value: 25, label: '25' },
  ];


  //shuffle array
  const shuffleArray = () => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      swap(newArray, i, j);
    }
    setArray(newArray);
  }

  //darkmode
  const toggleDarkMode = () => {
    setdarkmode(!darkmode);
  }

  //handle change
  const handleChange = (event) => {
    // Update the sortingAlgorithm state based on the selected value
    const selectedAlgorithm = event.target.value;
    setSortingAlgorithm(selectedAlgorithm);
  };

  //swap function
  function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }


  const visualizeSort = () => {

    let generator;
    let delay = 500;
    switch (sortingAlgorithm) {
      case "bubbleSort":
        generator = bubbleSortGenerator([...array], setSwappingIndices);
        break;
      case "insertionSort":
        generator = insertionSortGenerator([...array], setSwappingIndices);
        break;
      case "selectionSort":
        generator = selectionSortGenerator([...array], setSwappingIndices);
        break;
      case "gnomeSort":
        generator = gnomeSortGenerator([...array], setSwappingIndices);
        break;
      default:
        return;
    }

    const interval = setInterval(() => {
      let result = generator.next();
      if (!result.done) {
        setArray(result.value);
      } else {
        clearInterval(interval);
        setSwappingIndices(null); // Clear the swapping indices
      }
    }, delay);

  };


  return (
    <div style={{ backgroundColor: !darkmode ? '#252422' : '#fff' }} >

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ p: '10px' }}>
          <Select
            padding="10px"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortingAlgorithm}
            label="sortingAlgorithm"
            onChange={handleChange}

            style={{ color: !darkmode ? '#fff' : '#000', borderColor: !darkmode ? '#fff' : '#000' }}
          >
            <MenuItem value="bubbleSort">Bubble Sort</MenuItem>
            <MenuItem value={"insertionSort"}>Insertion Sort</MenuItem>
            <MenuItem value={"selectionSort"}>Selection Sort</MenuItem>
            <MenuItem value={"gnomeSort"}>Gnome Sort</MenuItem>
          </Select>

          <IconButton sx={{ m: '10px', backgroundColor: '#09D3AC', borderRadius: '5px', color: '#fff' }} onClick={shuffleArray}>
            <ShuffleIcon />
          </IconButton>
          <Button sx={{ m: '10px', backgroundColor: '#09D3AC' }} variant="contained" onClick={visualizeSort}>Start</Button>
        </Box>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <p style={{ color: darkmode ? '#252422' : '#fff' }}>Dark Mode</p>
          <Switch onChange={toggleDarkMode} />
        </Box>
      </Box>


      <Box margin={'0px 20px'} display={'flex'} alignItems={'center'}>
        <p style={{ color: darkmode ? '#252422' : '#fff' }}>Elements</p>

        <Slider
          sx={{
            width: '200px', m: '20px', color: '#09D3AC',
            '& .MuiSlider-markLabel': {
              color: `${!darkmode ? '#fff' : '#000'}`, // Set the color for the numbers
            },
          }}
          defaultValue={10}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"

          step={null}
          marks={marks}
          min={10}
          max={25}
          onChange={handleSliderChange}
        />
      </Box>

      <Box width={'800px'} height={'900'} margin={'auto'} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
        {
          array.map((value, idx) => {
            return <Box key={idx} height={`${value * (550 / Math.max(...array))}px`} width={`${800 / length}px`} bgcolor={idx === swappingIndices ? '#d62828' : '#09D3AC'} ></Box>
          })
        }

      </Box>

    </div>
  );
};

export default Home;
