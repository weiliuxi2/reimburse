package com.wlx.reimburse.common;

import java.util.List;

public class Paging<T> {

	private Integer pageSize;
	
	private Integer pageNo;
	

	
	private List<T> t;
	
	private Integer total;
	
	public Paging(List<T> t) {
		this.t = t;
	}
	
	public Paging() {
	}
	


	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getPageNo() {
		return pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	public List<T> getT() {
		return t;
	}

	public void setT(List<T> t) {
		this.t = t;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}
	
	
	
	
	
}
