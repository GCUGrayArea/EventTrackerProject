package com.skilldistillery.alccountant.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table( name = "bar_tab" )
public class BarTab {
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	private int id;
	@OneToMany(mappedBy = "tab")
	private List<Drink> drinks;
	private String location;
	
	@Column( name = "created_at" )
	private String createdAt;
	
	public BarTab() {
		super();
	}
	
	public BarTab(List<Drink> drinks, String location, String createdAt) {
		super();
		this.drinks = drinks;
		this.location = location;
		this.createdAt = createdAt;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public List<Drink> getDrinks() {
		return drinks;
	}
	
	public void setDrinks(List<Drink> drinks) {
		this.drinks = drinks;
	}
	
	public String getLocation() {
		return location;
	}
	
	public void setLocation(String location) {
		this.location = location;
	}
	
	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		BarTab other = (BarTab) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
	@Override
	public String toString() {
		double total = 0;
		for ( Drink d : drinks ) {
			total += d.getPrice();
		}
		return "BarTab [id=" + id + ", location=" + location + ", drinks=" +
			getDrinks().size() + ", total=" + total + ", timestamp=" + createdAt + "]";
	}

}
