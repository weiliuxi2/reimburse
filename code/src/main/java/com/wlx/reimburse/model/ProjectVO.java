package com.wlx.reimburse.model;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "project")
public class ProjectVO extends BaseVO {
	
	

	@Column(name = "name")
	private String name;
	
	@Column(name = "bianhao")
	private String bianHao;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBianHao() {
		return bianHao;
	}

	public void setBianHao(String bianHao) {
		this.bianHao = bianHao;
	}
	
	
}
