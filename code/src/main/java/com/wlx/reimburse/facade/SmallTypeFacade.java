package com.wlx.reimburse.facade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wlx.reimburse.dao.SmallTypeDAO;
import com.wlx.reimburse.model.SmallTypeVO;

@Component
public class SmallTypeFacade extends BaseFacade{

	@Autowired
	private SmallTypeDAO DAO;
	
	public List<SmallTypeVO> query(){
		return DAO.query();
	}
	
	public List<SmallTypeVO> queryPaging(SmallTypeVO vo){
		return DAO.queryPaging();
	}
	
	public boolean save(SmallTypeVO vo){
		super.setSaveTime(vo);
		DAO.save(vo);	
		return true;
	}
	
	public boolean update(SmallTypeVO vo){
		super.setUpdateTime(vo);
		DAO.update(vo);
		return true;
	}
	
	public boolean delete(int id){
		DAO.delete(id);
		return true;
	}
	
	
	
}
