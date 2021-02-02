package io.github.springsongs.modules.sys.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import io.github.springsongs.modules.sys.dto.SpringDataAuthorityDTO;
import io.github.springsongs.modules.sys.query.SpringDataAuthorityQuery;

public interface ISpringDataAuthorityService {
	 void deleteByPrimaryKey(Integer id);
     void insert(SpringDataAuthorityDTO record);
     SpringDataAuthorityDTO selectByPrimaryKey(Integer id);
     void updateByPrimaryKey(SpringDataAuthorityDTO record);
     Page<SpringDataAuthorityDTO> getAllRecordByPage(SpringDataAuthorityQuery record, Pageable pageable);
     void setDeleted(List<Integer> ids);
     void batchSaveExcel(List<String[]> list);

}
