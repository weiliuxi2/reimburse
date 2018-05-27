package com.wlx.reimburse.model;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "type_big")
public class BigTypeVO extends BaseVO {

	@Column(name = "name")
	private String name;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
}
