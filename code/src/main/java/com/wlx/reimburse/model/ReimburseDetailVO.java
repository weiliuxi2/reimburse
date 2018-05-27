package com.wlx.reimburse.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "reimburse_detail")
public class ReimburseDetailVO extends BaseVO {

	@Column(name = "begin_time")
	private Timestamp beginTime;
	
	@Column(name = "end_time")
	private Timestamp endTime;
	
	@Column(name = "project_bianHao")
	private String projectBianHao;
	
	@Column(name = "project_name")
	private String projectName;
	
//	@Column(name = "begin_address")
//	private String beginAddress;
//	
//	@Column(name = "smallTypeId")
//	private int smallTypeId;
	
	@Column(name = "money")
	private String money;
	
	@Column(name = "dan_hao")
	private String danHao;
	
	@Column(name = "type_id")
	private String typeId;
	
	@Column(name = "type_name")
	private String typeName;
	
	
	



	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}

	public Timestamp getEndTime() {
		return endTime;
	}

	public void setEndTime(Timestamp endTime) {
		this.endTime = endTime;
	}

	

	public String getProjectBianHao() {
		return projectBianHao;
	}

	public void setProjectBianHao(String projectBianHao) {
		this.projectBianHao = projectBianHao;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public Timestamp getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(Timestamp beginTime) {
		this.beginTime = beginTime;
	}

	public String getMoney() {
		return money;
	}

	public void setMoney(String money) {
		this.money = money;
	}

	public String getDanHao() {
		return danHao;
	}

	public void setDanHao(String danHao) {
		this.danHao = danHao;
	}

	
	
}
