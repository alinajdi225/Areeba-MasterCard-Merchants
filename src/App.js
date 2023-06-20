import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './index.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Locationbox from './Components/Locationbox';
import Typesbox from './Components/Typesbox';
import Searchbox from './Components/Searchbox';
import Categorybox from './Components/Categorybox';
import Table from './Components/Table';
import Disclaimer from './Components/Disclaimer';
import Terms from './Components/Terms';
import arrow from './Images/arrow.svg';
import { ReactComponent as PreviousIcon } from './Images/previous.svg';
import nextArrow from './Images/nextArrow.svg';

function App() {
  const [apiData, setApiData] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('All Merchants');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const [selectedRegion, setSelectedRegion] = useState('All regions');

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);

    setCurrentPage(1);
  };
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredData = apiData.filter((item) => {
    const cityMatch =
      selectedRegion === 'All regions' || item.address.city === selectedRegion;
    const categoryMatch =
      selectedCategory === 'All Merchants' ||
      item.company.department === selectedCategory;
    const queryMatch = item.maidenName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return cityMatch && categoryMatch && queryMatch;
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRowsPerPageChange = (event) => {
    const selectedRowsPerPage = parseInt(event.target.value);
    setRowsPerPage(selectedRowsPerPage);
    setCurrentPage(1);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    if (currentPage < totalPages) {
      const nextPageData = filteredData.slice(
        currentPage * rowsPerPage,
        (currentPage + 1) * rowsPerPage,
      );
      if (nextPageData.length > 0) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const [dropdowntypesVisible, setDropdowntypesVisible] = useState(false);

  const typeshandleClick = () => {
    setDropdowntypesVisible(!dropdowntypesVisible);
  };

  const [dropdownlocationVisible, setDropdownlocationVisible] = useState(false);

  const locationhandleClick = () => {
    setDropdownlocationVisible(!dropdownlocationVisible);
  };

  useEffect(() => {
    axios
      .get(
        'https://raw.githubusercontent.com/Ovi/DummyJSON/master/src/data/users.json',
      )
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="header">
      <div>
        <Navbar />
      </div>

      <div className="bg-color">
        <Banner />
        <div className="body">
          <div className="container">
            <div className="select">
              <div className="select3">
                <Locationbox
                  selectedRegion={selectedRegion}
                  handleRegionSelect={handleRegionSelect}
                  dropdownlocationVisible={dropdownlocationVisible}
                  locationhandleClick={locationhandleClick}
                />

                <Typesbox
                  dropdowntypesVisible={dropdowntypesVisible}
                  typeshandleClick={typeshandleClick}
                />
              </div>

              <Searchbox
                searchQuery={searchQuery}
                handleSearchQueryChange={handleSearchQueryChange}
              />
            </div>

            <div className="categories">
              <Categorybox
                selectedCategory={selectedCategory}
                handleCategoryClick={handleCategoryClick}
                logo={
                  <svg
                    width="44"
                    height="40"
                    viewBox="0 0 44 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M39.8 18.9283C41.4205 18.1304 42.7491 16.6923 43.4 15C44 13.4 43.8 11.6 43 10.2L39.6 3.40002C38.6 1.60002 36.6 0.400024 34.6 0.400024H9.6C7.4 0.400024 5.6 1.60002 4.6 3.40002L1.2 10.2C0.400002 11.8 0.200002 13.4 1 15.2C1.51978 16.8893 2.79939 18.2409 4.40002 18.9804V36.4H4.00002C3.00002 36.4 2.40002 37 2.40002 38C2.40002 39 3.20002 39.6 4.00002 39.6H40C40.8 39.6 41.6 39 41.6 38C41.6 37 40.8 36.4 40 36.4H39.8V18.9283ZM7.60002 26.4V19.5838C9.26355 19.4496 10.889 18.4963 12 17.2C13.2 18.6 15 19.6 17 19.6C19 19.6 20.8 18.6 22 17.2C22.6466 17.9544 23.4675 18.5927 24.4 19.0209V26.4H7.60002ZM7.60002 29.6V36.4H24.4V29.6H7.60002ZM27.6 36.4H36.6V19.5867C34.761 19.4639 33.1194 18.506 32 17.2C30.9213 18.4585 29.3578 19.3937 27.6 19.57V36.4ZM38.0905 16.2033C39.0813 15.8461 39.9579 15.0317 40.4 14C40.6 13.2 40.6 12.2 40.2 11.6L36.8 4.80002C36.4 4.00002 35.6 3.40002 34.6 3.40002H9.6C8.6 3.60002 7.8 4.00002 7.4 4.80002L3.8 11.6C3.4 12.4 3.4 13.4 3.6 14.2C3.89654 15.2379 4.74268 16.056 5.81247 16.4097C5.8733 16.4033 5.93584 16.4 6.00002 16.4C6.33789 16.4 6.63009 16.4685 6.86892 16.5978C6.91245 16.5993 6.95615 16.6 7 16.6C8.6 16.6 9.8 15.6 10.2 14C10.4 13.2 11.2 12.6 12 12.6C12.8 12.6 13.4 13.2 13.6 14C14 15.6 15.4 16.6 17 16.6C18.6 16.6 20 15.6 20.4 14C20.6 13.2 21.4 12.6 22.2 12.6C23 12.6 23.6 13.2 24 13.8C24.2978 14.9912 25.1498 15.8498 26.226 16.2108C26.4243 16.2303 26.604 16.276 26.7631 16.346C26.9704 16.3817 27.1834 16.4 27.4 16.4C29 16.4 30 15.4 30.4 14C30.6 13.2 31.2 12.6 32 12.6C32.8 12.6 33.4 13.2 33.8 13.8C34.2 15.2 35.6 16.4 37 16.4C37.1587 16.4 37.3175 16.3872 37.475 16.3623C37.6558 16.2735 37.8618 16.217 38.0905 16.2033Z"
                      fill="#9a9a9a"
                    />
                  </svg>
                }
                text="All Merchants"
              />
              <Categorybox
                selectedCategory={selectedCategory}
                handleCategoryClick={handleCategoryClick}
                logo={
                  <svg
                    width="38"
                    height="41"
                    viewBox="0 0 38 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.5 9.5H8C4.96243 9.5 2.5 11.9624 2.5 15V17C2.5 17.8284 3.17157 18.5 4 18.5C4.82843 18.5 5.5 17.8284 5.5 17V15C5.5 13.6193 6.61929 12.5 8 12.5H32C33.3807 12.5 34.5 13.6193 34.5 15V35C34.5 36.3807 33.3807 37.5 32 37.5H26C25.1716 37.5 24.5 38.1716 24.5 39C24.5 39.8284 25.1716 40.5 26 40.5H32C35.0376 40.5 37.5 38.0376 37.5 35V15C37.5 11.9624 35.0376 9.5 32 9.5H28.5V9C28.5 4.30558 24.6944 0.5 20 0.5C15.3056 0.5 11.5 4.30558 11.5 9V9.5ZM14.5 9C14.5 5.96243 16.9624 3.5 20 3.5C23.0376 3.5 25.5 5.96243 25.5 9V9.5H14.5V9Z"
                      fill="#9a9a9a"
                    />
                    <path
                      d="M8 25.5C8.82843 25.5 9.5 26.1716 9.5 27C9.5 28.3807 10.6193 29.5 12 29.5C13.3807 29.5 14.5 28.3807 14.5 27C14.5 26.1716 15.1716 25.5 16 25.5C16.8284 25.5 17.5 26.1716 17.5 27C17.5 30.0376 15.0376 32.5 12 32.5C8.96243 32.5 6.5 30.0376 6.5 27C6.5 26.1716 7.17157 25.5 8 25.5Z"
                      fill="#9a9a9a"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17 40.5C20.5899 40.5 23.5 37.5899 23.5 34V26C23.5 22.4101 20.5899 19.5 17 19.5H7C3.41015 19.5 0.5 22.4101 0.5 26V34C0.5 37.5899 3.41015 40.5 7 40.5H17ZM20.5 34C20.5 35.933 18.933 37.5 17 37.5H7C5.067 37.5 3.5 35.933 3.5 34V26C3.5 24.067 5.067 22.5 7 22.5H17C18.933 22.5 20.5 24.067 20.5 26V34Z"
                      fill="#9a9a9a"
                    />
                  </svg>
                }
                text="Marketing"
              />
              <Categorybox
                selectedCategory={selectedCategory}
                handleCategoryClick={handleCategoryClick}
                logo={
                  <svg
                    width="38"
                    height="40"
                    viewBox="0 0 38 40"
                    fill="#9a9a9a"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.99985 13.5999C9.79985 13.5999 10.5999 12.9999 10.5999 11.9999V1.9999C10.5999 1.1999 9.99985 0.399902 8.99985 0.399902C7.99985 0.399902 7.59985 1.1999 7.59985 1.9999V11.9999C7.59985 12.7999 8.19985 13.5999 8.99985 13.5999Z"
                      fill="#9a9a9a"
                    />
                    <path
                      d="M15.9999 0.600098C15.1999 0.600098 14.3999 1.2001 14.3999 2.2001V11.2001C14.3999 13.2001 13.5999 15.2001 12.1999 16.4001C10.9999 17.4001 10.3999 18.8001 10.3999 20.2001V35.0001C10.3999 35.8001 9.7999 36.6001 8.7999 36.6001C7.7999 36.6001 7.1999 36.0001 7.1999 35.0001V20.2001C7.1999 18.8001 6.5999 17.4001 5.3999 16.4001C4.1999 15.0001 3.5999 13.2001 3.5999 11.0001V2.2001C3.5999 1.4001 2.9999 0.600098 1.9999 0.600098C0.999902 0.600098 0.399902 1.4001 0.399902 2.2001V11.6001C0.399902 14.4001 1.5999 17.0001 3.5999 18.6001C3.9999 18.8001 4.3999 19.4001 4.3999 20.2001V35.0001C4.3999 37.4001 6.3999 39.4001 8.7999 39.4001C11.1999 39.4001 13.1999 37.4001 13.1999 35.0001V20.2001C13.1999 19.4001 13.7999 18.8001 13.9999 18.6001C15.9999 16.8001 17.1999 14.0001 17.1999 11.2001V2.2001C17.5999 1.4001 16.7999 0.600098 15.9999 0.600098Z"
                      fill="#9a9a9a"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M31.9999 0.600098H33.9999C35.9999 0.600098 37.5999 2.2001 37.1999 4.2001V35.0001C37.1999 37.4001 35.1999 39.4001 32.7999 39.4001C30.3999 39.4001 28.3999 37.4001 28.3999 35.0001V26.8001C25.9999 25.6001 24.3999 23.0001 24.3999 20.2001V8.2001C24.3999 4.0001 27.7999 0.600098 31.9999 0.600098ZM32.7999 36.6001C33.7999 36.6001 34.3999 35.8001 34.3999 35.0001H33.9999V4.2001C33.9999 4.0001 33.7999 3.8001 33.5999 3.8001H31.5999C29.1999 3.8001 27.1999 5.8001 27.1999 8.2001V20.2001C27.1999 22.0001 28.3999 23.8001 30.1999 24.4001C30.7999 24.6001 31.1999 25.2001 31.1999 25.8001V35.0001C31.1999 36.0001 31.7999 36.6001 32.7999 36.6001Z"
                      fill="#9a9a9a"
                    />
                  </svg>
                }
                text="Training"
              />
              <Categorybox
                selectedCategory={selectedCategory}
                handleCategoryClick={handleCategoryClick}
                logo={
                  <svg
                    width="46"
                    height="40"
                    viewBox="0 0 46 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.4987 4.99243C18.4987 2.50634 20.5155 0.492432 23 0.492432C25.4844 0.492432 27.5012 2.50634 27.5012 4.99243V13.1682C27.6792 12.8463 27.8799 12.5357 28.1026 12.2388L29.9719 9.74649C29.6739 9.23155 29.5033 8.63365 29.5033 7.99591V5.99341C29.5033 4.06041 31.0703 2.49341 33.0033 2.49341H36.0062C37.9392 2.49341 39.5062 4.06041 39.5062 5.99341V7.99591C39.5062 8.63365 39.3356 9.23156 39.0376 9.7465L40.9069 12.2389C41.8372 13.4793 42.3848 14.96 42.4891 16.4993H44.0087C44.8371 16.4993 45.5087 17.1708 45.5087 17.9993C45.5087 18.8277 44.8371 19.4993 44.0087 19.4993H42.2371L39.7634 31.8678C38.875 36.3099 34.9747 39.5074 30.4446 39.5074H15.5553C11.0252 39.5074 7.12489 36.3099 6.2365 31.8678L3.7628 19.4993H1.99121C1.16278 19.4993 0.491211 18.8277 0.491211 17.9993C0.491211 17.1708 1.16278 16.4993 1.99121 16.4993H3.49246V15.9983C3.49246 12.873 5.69743 10.2627 8.63657 9.63825C9.26106 6.69911 11.8713 4.49414 14.9966 4.49414C16.2861 4.49414 17.4879 4.8695 18.4987 5.5169V4.99243ZM39.4781 16.4993C39.3814 15.6102 39.0475 14.7596 38.5069 14.0389L36.5663 11.4513C36.3839 11.4807 36.1968 11.4959 36.0062 11.4959H33.0033C32.8127 11.4959 32.6256 11.4807 32.4432 11.4513L30.5026 14.0388C29.962 14.7596 29.6281 15.6101 29.5314 16.4993H39.4781ZM27.5012 19.4993H39.1777L36.8217 31.2795C36.2137 34.3193 33.5447 36.5074 30.4446 36.5074H15.5553C12.4553 36.5074 9.78618 34.3192 9.17824 31.2794L6.82221 19.4993H18.4987V23.0024C18.4987 25.4885 20.5155 27.5024 23 27.5024C25.4844 27.5024 27.5012 25.4885 27.5012 23.0024V19.4993ZM24.5012 17.9993L24.5012 4.99243C24.5012 4.16482 23.8292 3.49243 23 3.49243C22.1707 3.49243 21.4987 4.16482 21.4987 4.99243V23.0024C21.4987 23.83 22.1707 24.5024 23 24.5024C23.8292 24.5024 24.5012 23.83 24.5012 23.0024L24.5012 17.9993ZM18.4987 16.4993H6.49246V15.9983C6.49246 14.0642 8.0604 12.4962 9.99454 12.4962C10.823 12.4962 11.4945 11.8247 11.4945 10.9962C11.4945 9.06208 13.0625 7.49414 14.9966 7.49414C16.9308 7.49414 18.4987 9.06208 18.4987 10.9962V16.4993ZM36.264 8.42443L36.2969 8.40276C36.4236 8.31206 36.5062 8.16363 36.5062 7.99591V5.99341C36.5062 5.71727 36.2824 5.49341 36.0062 5.49341H33.0033C32.7272 5.49341 32.5033 5.71727 32.5033 5.99341V7.99591C32.5033 8.16362 32.5859 8.31205 32.7126 8.40276L32.7455 8.42443C32.8208 8.46981 32.909 8.49591 33.0033 8.49591H36.0062C36.1005 8.49591 36.1887 8.4698 36.264 8.42443Z"
                      fill="#9a9a9a"
                    />
                  </svg>
                }
                text="Sales"
              />
              <Categorybox
                selectedCategory={selectedCategory}
                handleCategoryClick={handleCategoryClick}
                logo={
                  <svg
                    width="46"
                    height="40"
                    viewBox="0 0 46 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.5 6C4.5 2.96243 6.96243 0.5 10 0.5H36C39.0376 0.5 41.5 2.96243 41.5 6V23.6459L42.0779 24.8018C42.0878 24.8205 42.0973 24.8395 42.1064 24.8586L44.9194 30.4847C45.3012 31.2483 45.4999 32.0903 45.5 32.944V34.9947C45.5001 37.4739 43.4951 39.4863 41.0159 39.495L39.6052 39.5L39.5999 39.5H6.38957L4.9685 39.49C2.49553 39.4727 0.499939 37.463 0.5 34.99V32.9441C0.500093 32.0904 0.698913 31.2483 1.08072 30.4847L3.8918 24.8625C3.90205 24.8407 3.91282 24.8192 3.92408 24.798L4.50012 23.6459L4.5 6ZM38.5 6V24L7.50012 24L7.5 6C7.50001 4.61929 8.61929 3.5 10 3.5H36C37.3807 3.5 38.5 4.61929 38.5 6ZM3.764 31.8263L6.17717 27H39.8229L42.2361 31.8264C42.4096 32.1734 42.5 32.5562 42.5 32.9442V34.9949C42.5001 35.8213 41.8317 36.4921 41.0053 36.495L39.5999 36.5H6.40012L4.98955 36.49C4.16518 36.4843 3.49998 35.8144 3.5 34.99V32.9441C3.50007 32.5561 3.59047 32.1734 3.764 31.8263ZM18.4415 30.5C17.6131 30.5 16.9415 31.1716 16.9415 32C16.9415 32.8284 17.6131 33.5 18.4415 33.5H27.5585C28.3869 33.5 29.0585 32.8284 29.0585 32C29.0585 31.1716 28.3869 30.5 27.5585 30.5H18.4415Z"
                      fill="#9a9a9a"
                    />
                  </svg>
                }
                text="Support"
              />
              <Categorybox
                selectedCategory={selectedCategory}
                handleCategoryClick={handleCategoryClick}
                logo={
                  <svg
                    width="48"
                    height="39"
                    viewBox="0 0 48 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M47.4002 13.6C47.4002 12 46.4002 10.8 45.2002 9.99998C44.0002 9.19998 42.4002 8.99998 41.0002 9.59998L40.8002 9.79998C37.4002 4.19998 31.4002 0.599976 24.6002 0.599976C14.2002 0.599976 5.60018 9.19998 5.60018 19.6C5.60018 19.8 5.60018 20 5.60018 20C1.60018 23.2 -0.199816 26.6 0.800184 29.2C1.60018 31.4 4.20018 32.6 7.80018 32.6H8.00018C8.80018 32.6 9.60018 32.6 10.4002 32.4C13.8002 36.2 18.8002 38.6 24.4002 38.6C34.8002 38.6 43.4002 30 43.4002 19.6C43.4002 19.4 43.4002 19.2 43.4002 19L44.6002 18.6C46.6002 17.6 47.6002 15.6 47.4002 13.6ZM7.80018 29.6C5.60018 29.6 3.80018 29 3.40018 28C3.00018 27.2 3.80018 25.6 5.80018 23.6C6.20018 25.8 7.00018 27.8 8.20018 29.6C8.20018 29.4 8.00018 29.6 7.80018 29.6ZM24.4002 35.6C20.4002 35.6 16.8002 34.2 14.0002 31.8C15.6002 31.4 17.2002 31 18.8002 30.2C19.6002 29.8 20.0002 29 19.6002 28.2C19.2002 27.4 18.4002 27 17.6002 27.4C15.6002 28.2 13.6002 28.8 11.6002 29.2C9.60018 26.6 8.40018 23.2 8.40018 19.6C8.40018 10.8 15.6002 3.59998 24.4002 3.59998C29.8002 3.59998 34.8002 6.39998 37.8002 10.8L33.4002 12.6L26.4002 6.99998C26.0002 6.79998 25.6002 6.59998 25.2002 6.79998L20.4002 7.79998C19.8002 7.79998 19.4002 8.19998 19.2002 8.79998C19.0002 9.19998 19.2002 9.79998 19.4002 10.2L24.0002 16.2L21.0002 17.6L19.4002 16.4C18.6002 15.8 17.6002 15.6 16.6002 16L14.0002 16.8C13.6002 17 13.2002 17.4 13.0002 17.8C12.8002 18.2 13.0002 18.8 13.2002 19.2L17.0002 24C17.6002 24.8 18.6002 25.2 19.4002 25.2C19.4002 25.2 19.4002 25.2 19.6002 25.2L28.2002 25C28.8002 25 29.4002 24.8 30.0002 24.6L40.6002 20C40.2002 28.6 33.0002 35.6 24.4002 35.6ZM43.4002 15.6L28.6002 22C28.4002 22 28.2002 22 28.0002 22L19.4002 22.2L17.0002 19L17.8002 18.8L20.2002 20.4C20.6002 20.6 21.2002 20.8 21.6002 20.6L27.2002 18.2C27.6002 18 28.0002 17.6 28.0002 17.2C28.2002 16.8 28.0002 16.2 27.8002 16L23.4002 10.4L25.2002 9.99998L32.4002 15.6C32.8002 16 33.4002 16 33.8002 15.8L40.4002 13.2C40.6002 13.2 40.6002 13.2 40.8002 13.2C40.8002 13.2 40.8002 13.2 41.0002 13.2L42.0002 12.4C42.6002 12.2 43.2002 12.2 43.6002 12.6C44.0002 12.8 44.4002 13.4 44.4002 14C44.6002 14.6 44.2002 15.4 43.4002 15.6Z"
                      fill="#9a9a9a"
                    />
                  </svg>
                }
                text="Legal"
              />
              <Categorybox
                selectedCategory={selectedCategory}
                handleCategoryClick={handleCategoryClick}
                logo={
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="#9a9a9a"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M24.6092 19.9393C25.195 19.3535 26.1447 19.3535 26.7305 19.9393L36.7305 29.9393C38.9723 32.1811 38.9723 35.8188 36.7305 38.0606C34.4887 40.3024 30.851 40.3024 28.6092 38.0606L18.6092 28.0606C18.0234 27.4748 18.0234 26.5251 18.6092 25.9393C19.195 25.3535 20.1447 25.3535 20.7305 25.9393L30.7305 35.9393C31.8007 37.0095 33.539 37.0095 34.6092 35.9393C35.6794 34.8691 35.6794 33.1308 34.6092 32.0606L24.6092 22.0606C24.0234 21.4748 24.0234 20.5251 24.6092 19.9393Z"
                      fill="#9a9a9a"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M30.0148 3.89215C27.7648 3.63159 25.4432 4.34795 23.7305 6.06064C21.6477 8.14345 21.039 11.1275 21.8679 13.7878C22.0338 14.32 21.8907 14.9004 21.4965 15.2946L4.73113 32.06C3.63614 33.1563 3.66052 34.9456 4.80394 36.0101C5.85965 36.9943 7.59174 36.9568 8.68118 35.8673L25.3752 19.1733C25.7694 18.7791 26.3498 18.636 26.8821 18.8019C29.5423 19.6308 32.5264 19.0221 34.6092 16.9393C36.3222 15.2263 37.0385 12.9041 36.7775 10.6536L32.7305 14.7006C32.1447 15.2864 31.195 15.2864 30.6092 14.7006L25.9692 10.0606C25.3835 9.47493 25.3834 8.52534 25.969 7.93952L30.0148 3.89215ZM36.8738 9.69365L37.8318 8.69398L36.8386 9.68113C36.8503 9.68551 36.862 9.68968 36.8738 9.69365ZM38.8878 7.62862C39.115 7.85232 39.2824 8.13201 39.3721 8.43791C40.4583 12.0654 39.6197 16.1714 36.7305 19.0606C34.0459 21.7452 30.3117 22.658 26.887 21.9042L10.8025 37.9886C8.63994 40.1512 5.06731 40.357 2.75901 38.2052C0.367152 35.9776 0.319766 32.2314 2.60855 29.9399L18.7657 13.7828C18.0118 10.3581 18.9246 6.6239 21.6092 3.93932C24.4997 1.04881 28.608 0.210826 32.2368 1.29921L32.2533 1.30416C32.511 1.38469 32.7971 1.5333 33.0434 1.78419L33.3605 2.10132C34.1022 2.84304 34.1023 4.04663 33.3607 4.78844L29.151 8.99978L31.6698 11.5187L35.8812 7.30732C36.623 6.56553 37.8267 6.56553 38.5685 7.30732L38.5718 7.31058L38.8878 7.62862Z"
                      fill="#9a9a9a"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.72997 1.77288C3.82986 1.47294 2.84001 1.70849 2.17118 2.37732L4.72997 1.77288ZM4.72997 1.77288L8.77514 3.12061C10.2078 3.59739 11.1698 4.93841 11.1698 6.44198V11C11.1698 11.8284 10.4983 12.5 9.66984 12.5H5.11184C3.60539 12.5 2.26725 11.5379 1.79074 10.1061L0.442814 6.06032C0.142866 5.16021 0.378352 4.17015 1.04718 3.50132L2.17118 2.37732M3.38649 5.40465L4.63693 9.15785C4.70467 9.36156 4.89458 9.49998 5.11184 9.49998H8.16984V6.44198C8.16984 6.22584 8.03142 6.03481 7.82854 5.96735L4.07451 4.71663L3.38649 5.40465Z"
                      fill="#9a9a9a"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.61918 9.93932C9.20497 9.35353 10.1547 9.35353 10.7405 9.93932L17.7405 16.9393C18.3263 17.5251 18.3263 18.4748 17.7405 19.0606C17.1547 19.6464 16.205 19.6464 15.6192 19.0606L8.61918 12.0606C8.03339 11.4749 8.03339 10.5251 8.61918 9.93932Z"
                      fill="#9a9a9a"
                    />
                  </svg>
                }
                text="Services"
              />
            </div>
          </div>

          <Table
            filteredData={filteredData}
            rowsPerPage={rowsPerPage}
            handleRowsPerPageChange={handleRowsPerPageChange}
            startIndex={startIndex}
            endIndex={endIndex}
            currentPage={currentPage}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
            arrow={arrow}
            nextArrow={nextArrow}
            PreviousIcon={PreviousIcon}
          />

          <div>
            <hr className="gray-line" />
          </div>

          <footer className=" footer-padding">
            <div className="footer">
              <Disclaimer />
              <Terms />
            </div>
          </footer>

          <div>
            <p className="rights">areebamerchants © 2023 All rights reserved</p>
          </div>
          <div>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
