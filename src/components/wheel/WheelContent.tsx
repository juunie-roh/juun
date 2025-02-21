import { Check, Menu, X } from 'lucide-react';

const wheelContent = {
  four: (
    <>
      <div className="arc" title="Option 0">
        <i>
          <Menu />
        </i>
      </div>
      <div className="arc" title="Option 1">
        <i>
          <Menu />
        </i>
      </div>
      <div className="arc" title="Option 2">
        <i>
          <Menu />
        </i>
      </div>
      <div className="arc" title="Option 3">
        <i>
          <Menu />
        </i>
      </div>
    </>
  ),
  five: (
    <>
      <div className="arc" title="Option 0">
        <i>
          <Menu />
        </i>
      </div>
      <div className="arc" title="Option 1">
        <i>
          <Menu />
        </i>
      </div>
      <div className="arc" title="Option 2">
        <i>
          <Menu />
        </i>
      </div>
      <div className="arc" title="Option 3">
        <i>
          <Menu />
        </i>
      </div>
      <div className="arc" title="Option 4">
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
