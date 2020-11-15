package com.skilldistillery.alccountant.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Drink {
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	private int id;
	private String name;
	private Double price;
	@ManyToOne( cascade = { CascadeType.PERSIST, CascadeType.REMOVE } )
	@JoinColumn( name = "tab_id")
	private BarTab tab;
	
	public Drink() {
		super();
	}

	public Drink(String name, Double price, BarTab tab) {
		super();
		this.name = name;
		this.price = price;
		this.tab = tab;
	}

	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Double getPrice() {
		return price;
	}
	
	public void setPrice(Double price) {
		this.price = price;
	}
	
	public BarTab getTab() {
		return tab;
	}

	public void setTab(BarTab tab) {
		this.tab = tab;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}
	
	public Drink(int id, String name, Double price, BarTab tab) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.tab = tab;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Drink other = (Drink) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
	@Override
	public String toString() {
		return "Drink [id=" + id + ", name=" + name + ", price=" + price + "]";
	}
}
