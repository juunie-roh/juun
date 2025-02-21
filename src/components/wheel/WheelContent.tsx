import { Check, Menu, X } from 'lucide-react';

const wheelContent = {
  four: (
    <>
      <div className="arc" title="menu0">
        <i>
          <Menu />
        </i>
      </div>
      <div className="arc" title="menu1">
        <i>
          <Menu />
        </i>
      </div>
      <div className="arc" title="menu2">
        <i>
          <Menu />
        </i>
      </div>
      <div className="arc" title="menu3">
        <i>
          <Menu />
        </i>
      </div>
    </>
  ),
  five: (
    <>
      <div className="arc" title="menu0">
        <i>
          <Menu />
        </i>
      </div>
      <div className="arc" title="menu1">
        <i>
          <Menu />
        </i>
      </div>
      <div className="arc" title="menu2">
        <i>
          <Menu />
        </i>
      </div>
      <div className="arc" title="menu3">
        <i>
          <Menu />
        </i>
      </div>
      <div className="arc" title="menu4">
        <i>
          <Menu />
        </i>
      </div>
    </>
  ),
  confirm: (
    <>
      <div className="arc" title="confirm">
        <i>
          <Check />
        </i>
      </div>
      <div className="arc" title="cancel">
        <i>
          <X />
        </i>
      </div>
    </>
  ),
};

export default wheelContent;
