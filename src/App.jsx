import { useState, useCallback, useMemo, useEffect } from 'react';
import { BUILTIN_DATA } from './data/assessmentData';

/* ═══════════════ 工具函数 ═══════════════ */
const getAllItems = (d) => { const r = []; d.forEach(p => p.topics.forEach(t => t.items.forEach(i => r.push({ ...i, pid: p.id, tid: t.id })))); return r; };
const calcPct = (done, total) => total ? Math.round(done / total * 100) : 0;
const COLOR_POOL = ['#06b6d4', '#14b8a6', '#f97316', '#e879f9', '#22d3ee', '#84cc16', '#f43f5e', '#6366f1'];
let _colorIdx = 0;
const nextColor = () => COLOR_POOL[_colorIdx++ % COLOR_POOL.length];
let _idCounter = Date.now();
const uid = (prefix = 'custom') => prefix + '_' + (++_idCounter).toString(36);

/* ═══════════════ localStorage 持久化 ═══════════════ */
const STORAGE_KEY = 'flutter_mastery_custom';
const PROGRESS_KEY = 'flutter_mastery_progress';
const loadCustom = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } };
const saveCustom = (d) => localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
const loadProgress = () => { try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; } catch { return {}; } };
const saveProgress = (d) => localStorage.setItem(PROGRESS_KEY, JSON.stringify(d));

/* ═══════════════ 样式常量 ═══════════════ */
const S = {
  header: { background: '#1e293b', borderBottom: '1px solid #334155', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 },
  main: { display: 'flex', minHeight: 'calc(100vh - 57px)' },
  sidebar: { width: 280, minWidth: 280, background: '#1e293b', borderRight: '1px solid #334155', overflowY: 'auto', maxHeight: 'calc(100vh - 57px)', padding: '10px 0' },
  content: { flex: 1, padding: '24px 32px', overflowY: 'auto', maxHeight: 'calc(100vh - 57px)' },
  partItem: { padding: '9px 18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, borderRadius: 6, margin: '2px 8px', transition: 'background .15s' },
  topicItem: { padding: '7px 18px 7px 46px', cursor: 'pointer', fontSize: 13, color: '#94a3b8', flex: 1 },
  card: { background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: 24, marginBottom: 20 },
  optBtn: { display: 'block', width: '100%', textAlign: 'left', padding: '12px 16px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', cursor: 'pointer', marginBottom: 8, fontSize: 14, transition: 'all .15s', lineHeight: 1.5 },
  btn: { padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, transition: 'all .15s' },
  code: { background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: 16, fontFamily: "'SF Mono','Fira Code',monospace", fontSize: 13, lineHeight: 1.6, overflowX: 'auto', whiteSpace: 'pre', color: '#e2e8f0', margin: '12px 0' },
  bar: { height: 6, borderRadius: 3, background: '#334155', overflow: 'hidden' },
  tag: { display: 'inline-block', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600 },
  ref: { background: '#0f172a', border: '1px solid #334155', borderLeft: '3px solid #3b82f6', borderRadius: '0 8px 8px 0', padding: '16px 20px', marginTop: 12, fontSize: 13, lineHeight: 1.7, color: '#cbd5e1', whiteSpace: 'pre-wrap' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modal: { background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: 28, width: 560, maxWidth: '90vw', maxHeight: '85vh', overflowY: 'auto' },
};

const TYPE_LABEL = { quiz: '选择题', code: '代码找错', task: '实战任务', open: '开放问答' };
const TYPE_COLOR = { quiz: '#3b82f6', code: '#f59e0b', task: '#22c55e', open: '#a78bfa' };

/* ═══════════════ 基础组件 ═══════════════ */
const Bar = ({ pct, c }) => <div style={S.bar}><div style={{ height: '100%', borderRadius: 3, background: c || '#3b82f6', width: pct + '%', transition: 'width .3s' }} /></div>;
const TypeTag = ({ t }) => <span style={{ ...S.tag, background: TYPE_COLOR[t] + '22', color: TYPE_COLOR[t] }}>{TYPE_LABEL[t]}</span>;

function Modal({ title, children, onClose }) {
  return (
    <div style={S.modalOverlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <h3 style={{ marginBottom: 16, fontSize: 18 }}>{title}</h3>
        {children}
      </div>
    </div>
  );
}

/* ═══════════════ 题目组件 ═══════════════ */
function QuizItem({ item, done, onDone }) {
  const [sel, setSel] = useState(null), [sub, setSub] = useState(false);
  const optS = (i) => {
    if (!sub) return i === sel ? { ...S.optBtn, borderColor: '#60a5fa', background: '#1e3a5f' } : S.optBtn;
    if (i === item.answer) return { ...S.optBtn, borderColor: '#4ade80', background: '#14532d' };
    if (i === sel) return { ...S.optBtn, borderColor: '#ef4444', background: '#450a0a' };
    return { ...S.optBtn, opacity: 0.5 };
  };
  return (
    <div style={S.card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <TypeTag t="quiz" />
        {done && <span style={{ color: '#4ade80', fontSize: 13 }}>&#10003; 已掌握</span>}
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 16, fontWeight: 500 }}>{item.question}</p>
      {(item.options || []).map((o, i) => (
        <button key={i} style={optS(i)} onClick={() => !sub && setSel(i)} disabled={sub}>
          <b style={{ color: '#64748b', marginRight: 8 }}>{String.fromCharCode(65 + i)}.</b>{o}
        </button>
      ))}
      {!sub ? (
        <button style={{ ...S.btn, background: '#3b82f6', color: '#fff', marginTop: 8 }} onClick={() => { if (sel !== null) { setSub(true); if (sel === item.answer) onDone(item.id); } }}>提交答案</button>
      ) : (
        <div style={{ background: sel === item.answer ? '#14532d' : '#450a0a', borderRadius: 8, padding: '12px 16px', marginTop: 8, fontSize: 14, lineHeight: 1.6 }}>
          <b>{sel === item.answer ? '回答正确！' : '回答错误'}</b>
          <p style={{ margin: '8px 0 0', color: '#cbd5e1' }}>{item.explain}</p>
        </div>
      )}
    </div>
  );
}

function CodeItem({ item, done, onDone }) {
  const [sel, setSel] = useState(null), [sub, setSub] = useState(false);
  const optS = (i) => {
    if (!sub) return i === sel ? { ...S.optBtn, borderColor: '#60a5fa', background: '#1e3a5f' } : S.optBtn;
    if (i === item.answer) return { ...S.optBtn, borderColor: '#4ade80', background: '#14532d' };
    if (i === sel) return { ...S.optBtn, borderColor: '#ef4444', background: '#450a0a' };
    return { ...S.optBtn, opacity: 0.5 };
  };
  return (
    <div style={S.card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <TypeTag t="code" />
        {done && <span style={{ color: '#4ade80', fontSize: 13 }}>&#10003; 已掌握</span>}
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 8, fontWeight: 500 }}>{item.question}</p>
      <pre style={S.code}>{item.code}</pre>
      {(item.options || []).map((o, i) => (
        <button key={i} style={optS(i)} onClick={() => !sub && setSel(i)} disabled={sub}>
          <b style={{ color: '#64748b', marginRight: 8 }}>{String.fromCharCode(65 + i)}.</b>{o}
        </button>
      ))}
      {!sub ? (
        <button style={{ ...S.btn, background: '#3b82f6', color: '#fff', marginTop: 8 }} onClick={() => { if (sel !== null) { setSub(true); if (sel === item.answer) onDone(item.id); } }}>提交答案</button>
      ) : (
        <div style={{ background: sel === item.answer ? '#14532d' : '#450a0a', borderRadius: 8, padding: '12px 16px', marginTop: 8, fontSize: 14, lineHeight: 1.6 }}>
          <b>{sel === item.answer ? '分析正确！' : '分析有误'}</b>
          <p style={{ margin: '8px 0 0', color: '#cbd5e1' }}>{item.explain}</p>
        </div>
      )}
    </div>
  );
}

function TaskItem({ item, done, onDone }) {
  const [cks, setCks] = useState({});
  const tog = (i) => setCks(p => ({ ...p, [i]: !p[i] }));
  const all = (item.criteria || []).every((_, i) => cks[i]);
  return (
    <div style={S.card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <TypeTag t="task" />
        {done && <span style={{ color: '#4ade80', fontSize: 13 }}>&#10003; 已完成</span>}
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 12, fontWeight: 500 }}>{item.question}</p>
      <div style={{ background: '#0f172a', borderRadius: 8, padding: 16, marginBottom: 16, fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap', color: '#cbd5e1' }}>{item.desc}</div>
      <p style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 8 }}>验收标准：</p>
      {(item.criteria || []).map((c, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '6px 0', cursor: 'pointer' }} onClick={() => tog(i)}>
          <input type="checkbox" checked={!!cks[i]} onChange={() => tog(i)} style={{ width: 18, height: 18, accentColor: '#3b82f6', marginTop: 2, flexShrink: 0 }} />
          <span style={{ fontSize: 14, color: cks[i] ? '#64748b' : '#cbd5e1', textDecoration: cks[i] ? 'line-through' : 'none' }}>{c}</span>
        </div>
      ))}
      {!done && (
        <button style={{ ...S.btn, background: all ? '#22c55e' : 'transparent', border: all ? 'none' : '1px solid #475569', color: all ? '#fff' : '#94a3b8', opacity: all ? 1 : 0.5, marginTop: 12 }} onClick={() => all && onDone(item.id)} disabled={!all}>
          {all ? '确认完成' : '请完成所有验收标准'}
        </button>
      )}
    </div>
  );
}

function OpenItem({ item, done, onDone }) {
  const [ans, setAns] = useState(''), [show, setShow] = useState(false);
  return (
    <div style={S.card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <TypeTag t="open" />
        {done && <span style={{ color: '#4ade80', fontSize: 13 }}>&#10003; 已作答</span>}
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 16, fontWeight: 500 }}>{item.question}</p>
      <textarea value={ans} onChange={e => setAns(e.target.value)} placeholder="在这里写下你的答案..." style={{ width: '100%', minHeight: 160, background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: 16, color: '#e2e8f0', fontSize: 14, lineHeight: 1.7, resize: 'vertical', outline: 'none' }} />
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button style={{ ...S.btn, background: '#3b82f6', color: '#fff' }} onClick={() => setShow(!show)}>{show ? '收起参考答案' : '查看参考答案'}</button>
        {!done && ans.trim().length > 20 && <button style={{ ...S.btn, background: '#22c55e', color: '#fff' }} onClick={() => onDone(item.id)}>标记为已作答</button>}
      </div>
      {show && <div style={S.ref}><b style={{ color: '#60a5fa' }}>参考答案：</b>{'\n'}{item.ref}</div>}
    </div>
  );
}

function ItemRenderer({ item, done, onDone, onDelete, isCustom }) {
  const Comp = { quiz: QuizItem, code: CodeItem, task: TaskItem, open: OpenItem }[item.type];
  if (!Comp) return null;
  return (
    <div style={{ position: 'relative' }}>
      <Comp item={item} done={done} onDone={onDone} />
      {isCustom && (
        <button onClick={() => { if (window.confirm('确定删除此题？')) onDelete(item.id); }} title="删除此题"
          style={{ position: 'absolute', top: 12, right: 12, background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 16, padding: '4px 8px', borderRadius: 4 }}
          onMouseEnter={e => e.target.style.color = '#ef4444'} onMouseLeave={e => e.target.style.color = '#64748b'}>
          &#10005;
        </button>
      )}
    </div>
  );
}

/* ═══════════════ 模态框 ═══════════════ */
function AddItemModal({ onClose, onAdd }) {
  const [type, setType] = useState('quiz'), [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']), [answer, setAnswer] = useState(0), [explain, setExplain] = useState('');
  const [code, setCode] = useState(''), [desc, setDesc] = useState('');
  const [criteria, setCriteria] = useState(['']), [ref, setRef] = useState('');
  const setOpt = (i, v) => { const n = [...options]; n[i] = v; setOptions(n); };
  const canSubmit = question.trim() && (
    (type === 'quiz' && options.every(o => o.trim()) && explain.trim()) ||
    (type === 'code' && code.trim() && options.every(o => o.trim()) && explain.trim()) ||
    (type === 'task' && desc.trim() && criteria.some(c => c.trim())) ||
    (type === 'open' && ref.trim())
  );
  const handleAdd = () => {
    if (!canSubmit) return;
    const base = { id: uid('item'), type, question: question.trim() };
    if (type === 'quiz') onAdd({ ...base, options: options.map(o => o.trim()), answer, explain: explain.trim() });
    else if (type === 'code') onAdd({ ...base, code: code.trim(), options: options.map(o => o.trim()), answer, explain: explain.trim() });
    else if (type === 'task') onAdd({ ...base, desc: desc.trim(), criteria: criteria.filter(c => c.trim()) });
    else if (type === 'open') onAdd({ ...base, ref: ref.trim() });
    onClose();
  };
  const fg = { marginBottom: 14 }, lb = { display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 4, fontWeight: 500 };
  return (
    <Modal title="添加检测题目" onClose={onClose}>
      <div style={fg}><label style={lb}>题目类型</label>
        <select value={type} onChange={e => setType(e.target.value)}><option value="quiz">选择题</option><option value="code">代码找错</option><option value="task">实战任务</option><option value="open">开放问答</option></select></div>
      <div style={fg}><label style={lb}>题目</label><textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="输入题目内容..." style={{ minHeight: 80 }} /></div>
      {type === 'code' && <div style={fg}><label style={lb}>代码片段</label><textarea value={code} onChange={e => setCode(e.target.value)} placeholder="粘贴代码..." style={{ fontFamily: 'monospace', minHeight: 120 }} /></div>}
      {(type === 'quiz' || type === 'code') && <>
        {[0,1,2,3].map(i => <div key={i} style={{ ...fg, display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="radio" name="ans" checked={answer === i} onChange={() => setAnswer(i)} style={{ width: 16, height: 16, accentColor: '#3b82f6', flexShrink: 0 }} />
          <input value={options[i]} onChange={e => setOpt(i, e.target.value)} placeholder={`选项 ${String.fromCharCode(65+i)}`} style={{ flex: 1 }} />
        </div>)}
        <p style={{ fontSize: 11, color: '#64748b', marginBottom: 12 }}>选择正确答案的圆圈</p>
        <div style={fg}><label style={lb}>解析说明</label><textarea value={explain} onChange={e => setExplain(e.target.value)} placeholder="解释正确答案..." /></div>
      </>}
      {type === 'task' && <>
        <div style={fg}><label style={lb}>任务描述</label><textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="详细描述任务要求..." style={{ minHeight: 120 }} /></div>
        <div style={fg}><label style={lb}>验收标准</label>
          {criteria.map((c, i) => <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
            <input value={c} onChange={e => { const n=[...criteria]; n[i]=e.target.value; setCriteria(n); }} placeholder={`标准 ${i+1}`} style={{ flex: 1 }} />
            {criteria.length > 1 && <button onClick={() => { const n=[...criteria]; n.splice(i,1); setCriteria(n); }} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px' }}>&#10005;</button>}
          </div>)}
          <button onClick={() => setCriteria([...criteria, ''])} style={{ background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 6, padding: '6px 14px', fontSize: 13, marginTop: 4 }}>+ 添加标准</button>
        </div>
      </>}
      {type === 'open' && <div style={fg}><label style={lb}>参考答案</label><textarea value={ref} onChange={e => setRef(e.target.value)} placeholder="参考答案要点..." style={{ minHeight: 120 }} /></div>}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 20 }}>
        <button style={{ background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 6, padding: '8px 16px' }} onClick={onClose}>取消</button>
        <button style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', opacity: canSubmit ? 1 : 0.5 }} onClick={handleAdd} disabled={!canSubmit}>添加</button>
      </div>
    </Modal>
  );
}

function AddTopicModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  return (
    <Modal title="添加知识主题" onClose={onClose}>
      <div style={{ marginBottom: 14 }}><label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 4, fontWeight: 500 }}>主题名称</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="例如：Platform Channel、插件开发..." autoFocus /></div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 20 }}>
        <button style={{ background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 6, padding: '8px 16px' }} onClick={onClose}>取消</button>
        <button style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', opacity: title.trim() ? 1 : 0.5 }} onClick={() => { if (title.trim()) { onAdd({ id: uid('topic'), title: title.trim(), items: [] }); onClose(); } }} disabled={!title.trim()}>添加</button>
      </div>
    </Modal>
  );
}

function AddPartModal({ onClose, onAdd }) {
  const [title, setTitle] = useState(''), [firstTopic, setFirstTopic] = useState('');
  return (
    <Modal title="添加知识模块" onClose={onClose}>
      <div style={{ marginBottom: 14 }}><label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 4, fontWeight: 500 }}>模块名称</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="例如：插件开发、混合开发、Flutter Web..." autoFocus /></div>
      <div style={{ marginBottom: 14 }}><label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 4, fontWeight: 500 }}>第一个主题（可选）</label>
        <input value={firstTopic} onChange={e => setFirstTopic(e.target.value)} placeholder="例如：MethodChannel 详解" /></div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 20 }}>
        <button style={{ background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 6, padding: '8px 16px' }} onClick={onClose}>取消</button>
        <button style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', opacity: title.trim() ? 1 : 0.5 }} onClick={() => {
          if (!title.trim()) return;
          const topics = firstTopic.trim() ? [{ id: uid('topic'), title: firstTopic.trim(), items: [] }] : [];
          onAdd({ id: uid('part'), title: title.trim(), level: 10, color: nextColor(), builtin: false, topics });
          onClose();
        }} disabled={!title.trim()}>添加</button>
      </div>
    </Modal>
  );
}

function ImportExportModal({ customParts, onClose, onImport }) {
  const [tab, setTab] = useState('export'), [importText, setImportText] = useState(''), [importError, setImportError] = useState('');
  const exportData = JSON.stringify({ customParts, exportedAt: new Date().toISOString() }, null, 2);
  const handleExport = () => { const blob = new Blob([exportData], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'flutter_mastery_custom.json'; a.click(); URL.revokeObjectURL(url); };
  const handleImport = () => { try { const p = JSON.parse(importText); if (!Array.isArray(p.customParts)) throw 0; onImport(p.customParts); onClose(); } catch { setImportError('导入失败：JSON 格式不正确'); } };
  const tb = (t) => ({ padding: '8px 16px', cursor: 'pointer', border: 'none', borderRadius: '6px 6px 0 0', background: tab === t ? '#334155' : 'transparent', color: tab === t ? '#e2e8f0' : '#64748b', fontSize: 14, fontWeight: tab === t ? 600 : 400 });
  return (
    <Modal title="导入 / 导出自定义数据" onClose={onClose}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
        <button style={tb('export')} onClick={() => setTab('export')}>导出</button>
        <button style={tb('import')} onClick={() => setTab('import')}>导入</button>
      </div>
      {tab === 'export' ? <div>
        <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>将自定义模块数据导出为 JSON 文件。</p>
        <textarea readOnly value={exportData} style={{ width: '100%', height: 200, fontFamily: 'monospace', fontSize: 12, resize: 'none' }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}><button style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px' }} onClick={handleExport}>下载 JSON 文件</button></div>
      </div> : <div>
        <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>粘贴 JSON 内容或选择文件。导入将覆盖当前自定义模块。</p>
        <input type="file" accept=".json" onChange={e => { const r = new FileReader(); r.onload = ev => setImportText(ev.target.result); r.readAsText(e.target.files[0]); }} style={{ marginBottom: 12, fontSize: 13 }} />
        <textarea value={importText} onChange={e => { setImportText(e.target.value); setImportError(''); }} placeholder="或粘贴 JSON..." style={{ width: '100%', height: 160, fontFamily: 'monospace', fontSize: 12 }} />
        {importError && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{importError}</p>}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}><button style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', opacity: importText.trim() ? 1 : 0.5 }} onClick={handleImport} disabled={!importText.trim()}>确认导入</button></div>
      </div>}
    </Modal>
  );
}

/* ═══════════════ 总览面板 ═══════════════ */
function Dashboard({ data, done }) {
  const all = getAllItems(data), total = all.length, dn = all.filter(i => done[i.id]).length, pct = calcPct(dn, total);
  const parts = data.map(p => { const its = []; p.topics.forEach(t => t.items.forEach(i => its.push(i))); const d = its.filter(i => done[i.id]).length; return { ...p, total: its.length, done: d, pct: calcPct(d, its.length) }; });
  const types = {}; all.forEach(i => { if (!types[i.type]) types[i.type] = { t: 0, d: 0 }; types[i.type].t++; if (done[i.id]) types[i.type].d++; });
  return (
    <div>
      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}><span style={{ fontSize: 18, fontWeight: 700 }}>总体进度</span><span style={{ fontSize: 28, fontWeight: 700, color: '#3b82f6' }}>{pct}%</span></div>
        <Bar pct={pct} c="#3b82f6" />
        <p style={{ margin: '8px 0 0', fontSize: 13, color: '#94a3b8' }}>已完成 {dn} / {total} 个检测项</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16, marginBottom: 24 }}>
        {parts.map(p => <div key={p.id} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: p.color, marginBottom: 4 }}>{p.pct}%</div>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>{p.title}</div>
          <Bar pct={p.pct} c={p.color} />
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{p.done}/{p.total}</div>
        </div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {Object.entries(types).map(([t, s]) => <div key={t} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: 16, textAlign: 'center' }}>
          <TypeTag t={t} /><div style={{ fontSize: 20, fontWeight: 700, marginTop: 8 }}>{s.d}/{s.t}</div>
        </div>)}
      </div>
    </div>
  );
}

/* ═══════════════ 主题内容 ═══════════════ */
function TopicView({ part, topic, done, onDone, onDeleteItem }) {
  const td = topic.items.filter(i => done[i.id]).length;
  const isCustom = !part.builtin;
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{part.title}</h2>
          <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 9999, fontWeight: 500, background: part.color + '22', color: part.color }}>Level {part.level}</span>
          {isCustom && <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 9999, fontWeight: 500, background: '#334155', color: '#94a3b8' }}>自定义</span>}
        </div>
        <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600, color: '#cbd5e1' }}>{topic.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, maxWidth: 300 }}><Bar pct={calcPct(td, topic.items.length)} c={part.color} /></div>
          <span style={{ fontSize: 13, color: '#94a3b8' }}>{td}/{topic.items.length}</span>
        </div>
      </div>
      {topic.items.length === 0 && <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b', fontSize: 14 }}>
        <p>这个主题还没有题目</p>
        {isCustom && <p style={{ marginTop: 8 }}>点击下方「添加题目」开始创建</p>}
      </div>}
      {topic.items.map(item => <ItemRenderer key={item.id} item={item} done={!!done[item.id]} onDone={onDone} onDelete={(iid) => onDeleteItem(part.id, topic.id, iid)} isCustom={isCustom} />)}
    </div>
  );
}

/* ═══════════════ 主应用 ═══════════════ */
export default function App() {
  const [customParts, setCustomParts] = useState(loadCustom);
  const [done, setDone] = useState(loadProgress);
  const [aPart, setAPart] = useState(null), [aTopic, setATopic] = useState(null);
  const [dash, setDash] = useState(true);
  const [showAddPart, setShowAddPart] = useState(false);
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showIE, setShowIE] = useState(false);
  const [confirmDel, setConfirmDel] = useState(null);

  const allData = useMemo(() => [...BUILTIN_DATA, ...customParts], [customParts]);
  useEffect(() => { saveCustom(customParts); }, [customParts]);
  useEffect(() => { saveProgress(done); }, [done]);

  const handleDone = useCallback((id) => setDone(p => ({ ...p, [id]: true })), []);
  const addPart = (part) => { setCustomParts(p => [...p, part]); setAPart(part.id); setATopic(part.topics[0]?.id || null); setDash(false); };
  const addTopic = (partId, topic) => { setCustomParts(p => p.map(x => x.id === partId ? { ...x, topics: [...x.topics, topic] } : x)); setATopic(topic.id); };
  const addItem = (partId, topicId, item) => { setCustomParts(p => p.map(x => { if (x.id !== partId) return x; return { ...x, topics: x.topics.map(t => t.id === topicId ? { ...t, items: [...t.items, item] } : t) }; })); };
  const deleteItem = (partId, topicId, itemId) => { setCustomParts(p => p.map(x => { if (x.id !== partId) return x; return { ...x, topics: x.topics.map(t => t.id === topicId ? { ...t, items: t.items.filter(i => i.id !== itemId) } : t) }; })); setDone(p => { const n = { ...p }; delete n[itemId]; return n; }); };
  const deleteTopic = (partId, topicId) => { setCustomParts(p => p.map(x => { if (x.id !== partId) return x; return { ...x, topics: x.topics.filter(t => t.id !== topicId) }; })); if (aTopic === topicId) setATopic(null); };
  const deletePart = (partId) => { setCustomParts(p => p.filter(x => x.id !== partId)); if (aPart === partId) { setAPart(null); setATopic(null); setDash(true); } };

  const allItems = getAllItems(allData);
  const oPct = calcPct(allItems.filter(i => done[i.id]).length, allItems.length);
  const cPart = allData.find(p => p.id === aPart);
  const cTopic = cPart?.topics.find(t => t.id === aTopic);
  const isCustomPart = cPart && !cPart.builtin;
  const goPart = (pid) => { setDash(false); setAPart(pid); const p = allData.find(x => x.id === pid); if (p?.topics[0]) setATopic(p.topics[0].id); };
  const goTopic = (pid, tid) => { setDash(false); setAPart(pid); setATopic(tid); };

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={S.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, cursor: 'pointer' }} onClick={() => setDash(true)}>Flutter 掌握度检测</h1>
          <div style={{ width: 120 }}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8', marginBottom: 2 }}><span>总进度</span><span>{oPct}%</span></div><Bar pct={oPct} /></div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ ...S.btn, background: 'transparent', border: '1px solid #475569', color: '#94a3b8', fontSize: 12, padding: '6px 14px' }} onClick={() => setShowIE(true)}>导入/导出</button>
          <button style={{ ...S.btn, background: 'transparent', border: '1px solid #475569', color: '#94a3b8', fontSize: 12, padding: '6px 14px' }} onClick={() => setConfirmDel({ title: '重置所有进度', msg: '确定要清除所有完成记录吗？', fn: () => setDone({}) })}>重置进度</button>
        </div>
      </div>
      <div style={S.main}>
        <div style={S.sidebar}>
          <div style={{ padding: '6px 14px', marginBottom: 4 }}><button style={{ ...S.btn, background: 'transparent', border: '1px solid #475569', color: '#94a3b8', width: '100%', fontSize: 13, padding: 8 }} onClick={() => setDash(true)}>&#128202; 总览面板</button></div>
          {allData.map(part => {
            const pt = part.topics.reduce((s, t) => s + t.items.length, 0), pd = part.topics.reduce((s, t) => s + t.items.filter(i => done[i.id]).length, 0);
            return (<div key={part.id}>
              <div style={{ ...S.partItem, ...(aPart === part.id ? { background: '#334155' } : {}) }} onClick={() => goPart(part.id)}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: part.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{part.title}</div><div style={{ fontSize: 11, color: '#64748b' }}>{pd}/{pt}{part.builtin ? '' : ' · 自定义'}</div></div>
                {!part.builtin && <button onClick={e => { e.stopPropagation(); setConfirmDel({ title: '删除模块', msg: `确定删除「${part.title}」？`, fn: () => deletePart(part.id) }); }} style={{ background: 'transparent', border: 'none', color: '#475569', cursor: 'pointer', fontSize: 14, padding: '2px 4px' }} onMouseEnter={e => e.target.style.color = '#ef4444'} onMouseLeave={e => e.target.style.color = '#475569'}>&#10005;</button>}
              </div>
              {aPart === part.id && part.topics.map(topic => {
                const td = topic.items.filter(i => done[i.id]).length;
                return (<div key={topic.id} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ ...S.topicItem, ...(aTopic === topic.id ? { color: '#e2e8f0', fontWeight: 500 } : {}) }} onClick={() => goTopic(part.id, topic.id)}>{topic.title} <span style={{ color: '#475569', marginLeft: 4 }}>({td}/{topic.items.length})</span></div>
                  {!part.builtin && <button onClick={e => { e.stopPropagation(); setConfirmDel({ title: '删除主题', msg: `确定删除「${topic.title}」？`, fn: () => deleteTopic(part.id, topic.id) }); }} style={{ background: 'transparent', border: 'none', color: '#475569', cursor: 'pointer', fontSize: 12, padding: '2px 6px', flexShrink: 0 }} onMouseEnter={e => e.target.style.color = '#ef4444'} onMouseLeave={e => e.target.style.color = '#475569'}>&#10005;</button>}
                </div>);
              })}
              {aPart === part.id && !part.builtin && <div style={{ padding: '4px 20px 4px 48px' }}><button onClick={() => { setAPart(part.id); setShowAddTopic(true); }} style={{ background: 'transparent', border: '1px dashed #475569', color: '#64748b', width: '100%', fontSize: 12, padding: '4px 0', borderRadius: 4 }}>+ 添加主题</button></div>}
            </div>);
          })}
          <div style={{ padding: '12px 14px' }}><button style={{ ...S.btn, background: 'transparent', border: '1px dashed #475569', color: '#64748b', width: '100%', fontSize: 13, padding: 8 }} onClick={() => setShowAddPart(true)}>+ 添加知识模块</button></div>
        </div>
        <div style={S.content}>
          {dash ? <Dashboard data={allData} done={done} /> :
            cPart && cTopic ? (<div><TopicView part={cPart} topic={cTopic} done={done} onDone={handleDone} onDeleteItem={deleteItem} />
              {isCustomPart && <div style={{ textAlign: 'center', padding: '16px 0' }}><button style={{ ...S.btn, background: '#3b82f6', color: '#fff' }} onClick={() => setShowAddItem(true)}>+ 添加题目到此主题</button></div>}</div>) :
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}><p style={{ fontSize: 16 }}>请从左侧选择一个模块开始检测</p></div>}
        </div>
      </div>
      {showAddPart && <AddPartModal onClose={() => setShowAddPart(false)} onAdd={addPart} />}
      {showAddTopic && aPart && <AddTopicModal onClose={() => setShowAddTopic(false)} onAdd={(t) => addTopic(aPart, t)} />}
      {showAddItem && cPart && cTopic && isCustomPart && <AddItemModal onClose={() => setShowAddItem(false)} onAdd={(item) => addItem(cPart.id, cTopic.id, item)} />}
      {showIE && <ImportExportModal customParts={customParts} onClose={() => setShowIE(false)} onImport={setCustomParts} />}
      {confirmDel && <Modal title={confirmDel.title} onClose={() => setConfirmDel(null)}>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#cbd5e1', marginBottom: 20 }}>{confirmDel.msg}</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button style={{ background: '#334155', color: '#e2e8f0', border: 'none', borderRadius: 6, padding: '8px 16px' }} onClick={() => setConfirmDel(null)}>取消</button>
          <button style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px' }} onClick={() => { confirmDel.fn(); setConfirmDel(null); }}>确认</button>
        </div>
      </Modal>}
    </div>
  );
}
