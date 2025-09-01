import React from 'react';

interface Props {
  onUpload: (file: any, name: string) => void;
  children: any;
  accept?: string;
  disabled?: boolean;
  multiple?: boolean;
  flex?: boolean;
}

export default function KFilePicker({
  onUpload,
  children,
  accept,
  disabled,
  multiple,
  flex = false,
}: Props) {
  const fileRef = React.useRef<any>(null);

  const handleFileUpload = () => {
    if (!multiple) {
      const file: File = fileRef.current.files[0];
      onUpload(file, file.name);
    } else {
      onUpload(fileRef.current.files, '');
    }
    if (!!fileRef.current) fileRef.current.value = null;
  };

  return (
    <React.Fragment>
      <input
        accept={accept || '*'}
        type='file'
        multiple={multiple || false}
        onChange={handleFileUpload}
        ref={fileRef}
        style={{ display: 'none' }}
      />
      <div
        style={{ display: flex ? 'inline-flex' : 'inline-block' }}
        onClick={() => {
          if (!disabled) fileRef.current.click();
        }}>
        {children}
      </div>
    </React.Fragment>
  );
}
