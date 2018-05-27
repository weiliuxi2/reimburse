package com.wlx.reimburse.model;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "type_small")
public class SmallTypeVO extends BaseVO {
	
	

	@Column(name = "name")
	private String name;
	
	@Column(name = "big_type_id")
	private int bigTypeId;
	
	private String bigTypeName;
	
	
	
	

	public String getBigTypeName() {
		return bigTypeName;
	}

	public void setBigTypeName(String bigTypeName) {
		this.bigTypeName = bigTypeName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getBigTypeId() {
		return bigTypeId;
	}

	public void setBigTypeId(int bigTypeId) {
		this.bigTypeId = bigTypeId;
	}
	
	
	
	
	
}
