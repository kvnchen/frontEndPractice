'use client';
import { useState } from 'react';
import styles from './styles.module.css';

const data = {
  CA: 'California is a state in the Western United States that lies on the Pacific Coast. It borders Oregon to the north, Nevada and Arizona to the east, and shares an international border with the Mexican state of Baja California to the south. With over 39 million residents across an area of 163,696 square miles (423,970 km2), it is the most populous U.S. state, the third-largest by area, and the most populated subnational entity in North America.',

  NV: `Nevada is a landlocked state in the Western United States.[c] It borders Oregon to the northwest, Idaho to the northeast, California to the west, Arizona to the southeast, and Utah to the east. Nevada is the seventh-most extensive, the 32nd-most populous, and the ninth-least densely populated U.S. state. Nearly three-quarters of Nevada's population live in Clark County, which contains the Las Vegas–Paradise metropolitan area,[7] including three of the state's four largest incorporated cities.[8] Nevada's capital is Carson City. Las Vegas is the largest city in the state.`,

  OR: `Oregon is a state in the Pacific Northwest region of the United States. It is a part of the Western U.S., with the Columbia River delineating much of Oregon's northern boundary with Washington, while the Snake River delineates much of its eastern boundary with Idaho. The 42° north parallel delineates the southern boundary with California and Nevada. The western boundary is formed by the Pacific Ocean.`
};

export function SVGMap() {
  const [hoverState, setHoverState] = useState(null);

  function renderCountries() {
    return (
      <svg width="1000" height="500" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <path 
          id="US-OR" title="Oregon" className={styles.land} 
          onMouseOver={() => setHoverState('OR')}
          d="M299.24,126.14L301.91,131.28L304.11,133.69L304.17,137.26L301.92,139.8L298.48,145.04L294.56,151.7L290.12,155.29L286.7,159.8L285.82,163.34L288.45,165.54L289.06,168.74L286.18,174.71L276.58,214.43L276.56,214.49L227.74,202.25L159.29,181.87L158.03,168.07L170.35,146.42L179.28,122.31L192.49,90.34L195.72,91.03L200.31,92.59L203.38,95.72L207.41,98.33L208.97,103.37L208.26,107.16L208.47,110.57L211.77,112.47L215.57,113.53L222.2,112.96L225.89,113.27L231.12,115.79L233.22,117.63L236.67,117.76L240.68,116.96L247.56,119.17L253.95,118.28L257.44,117.29L261.12,119.3L267.26,118.43z"/>

        <path 
          id="US-CA" title="California" className={styles.land} 
          onMouseOver={() => setHoverState('CA')}
          d="M227.74,202.25L209.97,267.9L234.88,306L259.69,342.73L283.94,377.49L283.9,379.56L284.28,382.78L284.99,386.99L286.51,391.67L289.13,396.66L282.58,400.09L279,409.98L274.3,414.34L274.45,418.47L274.42,421.95L277.1,425.71L274.1,429.74L271.6,429.19L247.2,426.36L225.43,423.15L225.09,414.45L219.96,401.1L203.57,383L196.4,380.28L190.28,371.27L176.35,365.7L172.7,360.88L173.84,348.28L162.81,321.41L157.2,286.87L159.32,282.02L153.91,272.55L146.38,250.33L149.63,231.97L144.55,217.34L153.92,200.58L159.29,181.87z" />

        <path 
        id="US-NV" title="Nevada" className={styles.land} 
        onMouseOver={() => setHoverState('NV')}
        d="M326.11,225.41L303.82,336.59L300.35,354.51L299.42,355.09L297.54,358.24L295.26,356.86L292.12,354.57L288.33,353.79L286.52,356.27L287.5,359.65L286.5,364.43L285.98,368.82L285.97,373.36L283.94,377.49L259.69,342.73L234.88,306L209.97,267.9L227.74,202.25L276.56,214.49L276.58,214.43z"/>
      </svg>
    )
  }

  function renderInfo() {
    if (hoverState !== null)
      return (
        <span>{data[hoverState]}</span>
      )
    else return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.map}>
        {renderCountries()}
      </div>
      <p className={styles.info}>
        {renderInfo()}
      </p>
    </div>
  )
}