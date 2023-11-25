import { useAppSelector, useAppDispatch } from '@/hooks';
import { addTag, setActiveTag } from '@/stores/tagsView.store';
import { Tabs } from 'antd';
import type { FC } from 'react';
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const TagsView: FC = () => {
  const { tags, activeTagId } = useAppSelector(state => state.tagsView);
  const { menuList } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (menuList.length) {
      const menu = menuList.find(child => child.path === location.pathname);
      if (menu) {
        dispatch(
          addTag({
            ...menu,
            closable: menu.code !== 'dashboard',
          }),
        );
      }
    }
  }, [ dispatch, location.pathname, menuList ]);

  const onChange = (key: string) => {
    const tag = tags.find(tag => tag.path === key);
    if (tag) {
      setCurrentTag(tag.path);
    }
  };

  const setCurrentTag = useCallback(
    (id?: string) => {
      const tag = tags.find(item => {
        if (id) {
          return item.path === id;
        } else {
          return item.path === location.pathname;
        }
      });
      if (tag) {
        dispatch(setActiveTag(tag.path));
      }
    },
    [ dispatch, location.pathname, tags ],
  );

  return (
    <div id="pageTabs" style={ { padding: '6px 4px' } }>
      <Tabs
        tabBarStyle={ { margin: 0 } }
        onChange={ onChange }
        activeKey={ activeTagId }
        type="editable-card"
        hideAdd
        items={ tags.map(tag => {
          return {
            key: tag.path,
            closable: tag.closable,
            label: tag.label,
          };
        }) }
      />
    </div>
  );
};

export default TagsView;