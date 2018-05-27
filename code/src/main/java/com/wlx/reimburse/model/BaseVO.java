package com.wlx.reimburse.model;

import java.sql.Timestamp;

import javax.persistence.Column;

public class BaseVO {
	
	@Column(name = "ID")
	private int id;
	
	@Column(name = "CREATE_TIME")
	private Timestamp createTime;
	
	@Column(name = "UPDATE_TIME")
	private Timestamp updateTime;
	
	@Column(name = "description")
	private String description;
	
	

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public Timestamp getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Timestamp updateTime) {
		this.updateTime = updateTime;
	}
	
	

}
