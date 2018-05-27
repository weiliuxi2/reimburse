package com.wlx.reimburse.facade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wlx.reimburse.dao.ReimburseBaseDAO;
import com.wlx.reimburse.model.ReimburseBaseVO;

@Component
public class ReimburseBaseFacade extends BaseFacade{

	@Autowired
	private ReimburseBaseDAO reimburseBaseDAO;
	
	public List<ReimburseBaseVO> query(){
		return reimburseBaseDAO.query();
	}
	
	public List<ReimburseBaseVO> getByVO(ReimburseBaseVO vo){
		return reimburseBaseDAO.getByVO(vo);
	}
	
	public int getSizeByVO(ReimburseBaseVO vo){
		return reimburseBaseDAO.getSizeByVO(vo);
	}
	
	
	public List<ReimburseBaseVO> queryPaging(ReimburseBaseVO vo){
		return reimburseBaseDAO.queryPaging();
	}
	
	public int save(ReimburseBaseVO vo){
		super.setSaveTime(vo);
		vo.setStatus(1);
		
		int id = reimburseBaseDAO.save(vo);	
		return id;
	}
	
	public boolean update(ReimburseBaseVO vo){
		super.setUpdateTime(vo);
		reimburseBaseDAO.update(vo);
		return true;
	}
	
	public boolean delete(int id){
		reimburseBaseDAO.delete(id);
		return true;
	}
	
	public boolean deleteByVO(ReimburseBaseVO vo){
		reimburseBaseDAO.deleteByVO(vo);
		return true;
	}
	
	
	
}
