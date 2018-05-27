package com.wlx.reimburse.dao;

import java.util.List;


public interface BaseDAO<T> {
	
	List<T> query();
	
	List<T> getByVO(T t);
	
	List<T> queryPaging();

	int save(T t);
	
	void update(T t);
	
	void delete(int id);
	
	void deleteByVO(T t);
}
