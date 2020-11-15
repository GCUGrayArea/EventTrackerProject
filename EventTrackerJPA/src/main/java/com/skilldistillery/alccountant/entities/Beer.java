package com.skilldistillery.alccountant.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Beer {
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	private Integer id;
	private String name;
	private String brewery;
	private String style;
	private Double abv;
	private String description;
	
	public Beer() {
		super();
	}
	
	public Beer(Integer id, String name, String brewery, String style, Double abv, String description) {
		super();
		this.id = id;
		this.name = name;
		this.brewery = brewery;
		this.style = style;
		this.abv = abv;
		this.description = description;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBrewery() {
		return brewery;
	}
	public void setBrewery(String brewery) {
		this.brewery = brewery;
	}
	public String getStyle() {
		return style;
	}
	public void setStyle(String style) {
		this.style = style;
	}
	public Double getAbv() {
		return abv;
	}
	public void setAbv(Double abv) {
		this.abv = abv;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
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
		Beer other = (Beer) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	@Override
	public String toString() {
		return "Beer [id=" + id + ", name=" + name + ", brewery=" + brewery + ", style=" + style + ", abv=" + abv
				+ ", description=" + description + "]";
	}
	
}
