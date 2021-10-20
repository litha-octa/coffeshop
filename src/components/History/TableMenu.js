import React, { Component }from "react";
import { Link } from "react-router-dom";
import "./History.css";
import Menu from "./Menu";
import Menu2 from "./Menu2";

class TableMenu extends Component {
  render() {
    return (
	
	<table  id="ListHistoryMenu" >
	<tr>
	<td><Menu/></td>
	<td><Menu/></td>
	<td><Menu/></td>
	</tr>
	<tr>
	<td><Menu2/></td>
	<td><Menu2/></td>
	<td><Menu2/></td>
	</tr>
	<tr>
	<td><Menu2/></td>
	<td><Menu2/></td>
	<td><Menu2/></td>
	</tr>
	<tr>
	<td><Menu2/></td>
	<td><Menu2/></td>
	<td><Menu2/></td>
	</tr>
	<tr>
	<td><Menu2/></td>
	<td><Menu2/></td>
	<td><Menu2/></td>
	</tr>
	</table>


    	        );
  }
}

export default TableMenu;