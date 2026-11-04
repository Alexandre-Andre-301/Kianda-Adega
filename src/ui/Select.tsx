import * as Select from '@radix-ui/react-select';

interface Opcao<T extends string> {
  valor: T;
  texto: string;
}

interface Props<T extends string> {
  valor: T;
  opcoes: readonly Opcao<T>[];
  onValor: (v: T) => void;
  ariaLabel: string;
}

const Seta = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <path d="m5 13 4 4L19 7" />
  </svg>
);

export function UiSelect<T extends string>({ valor, opcoes, onValor, ariaLabel }: Props<T>) {
  return (
    <Select.Root value={valor} onValueChange={onValor}>
      <Select.Trigger className="sel" aria-label={ariaLabel}>
        <span className="sel-valor">{opcoes.find(o => o.valor === valor)?.texto ?? '—'}</span>
        <Select.Icon className="sel-icone"><Seta /></Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="sel-conteudo" position="popper" sideOffset={6}>
          <Select.Viewport className="sel-view">
            {opcoes.map(o => (
              <Select.Item key={o.valor} className="sel-item" value={o.valor}>
                <Select.ItemText>{o.texto}</Select.ItemText>
                <Select.ItemIndicator className="sel-check"><Check /></Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
